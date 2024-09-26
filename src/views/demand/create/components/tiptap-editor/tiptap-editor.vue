<template>
  <div class="tiptap_editor" v-if="editor">
    <div class="tiptap_editor_tools">
      <TieleChange :editor="editor" />

      <FontSizeChange :editor="editor" />

      <div class="tools_item tools_item_single" @click="updateFontSize('add')">
        <div class="tools_item_label">
          <SvgIcon name="aplus" width="16px" height="16px" />
        </div>
      </div>

      <div class="tools_item tools_item_single" @click="updateFontSize('sub')">
        <div class="tools_item_label">
          <SvgIcon name="adgree" width="16px" height="16px" />
        </div>
      </div>

      <fontColorChange :editor="editor" type="color" />
      <fontColorChange :editor="editor" type="bg" />

      <div
        class="tools_item tools_item_single"
        :class="{ tools_item_active: editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <div class="tools_item_label">B</div>
      </div>

      <div
        class="tools_item tools_item_single"
        :class="{ tools_item_active: editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <div class="tools_item_label">
          <SvgIcon name="xieti" width="15px" height="15px" />
        </div>
      </div>

      <div
        class="tools_item tools_item_single"
        :class="{ tools_item_active: editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <div class="tools_item_label">
          <SvgIcon name="delete-line" width="15px" height="15px" />
        </div>
      </div>

      <UploadImage :editor="editor" />

      <div
        class="tools_item tools_item_single"
        :class="{ tools_item_active: editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <div class="tools_item_label">
          <SvgIcon name="ul" width="15px" height="15px" />
        </div>
      </div>

      <LinkChange :editor="editor" />

      <div
        class="tools_item tools_item_single"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ tools_item_active: editor.isActive('codeBlock') }"
      >
        <div class="tools_item_label">
          <SvgIcon name="code" width="15px" height="15px" />
        </div>
      </div>

      <TableChange :editor="editor" />

      <div class="tools_item tools_item_single">
        <div class="tools_item_label">
          <SvgIcon name="gaoliangkuai" width="15px" height="15px" />
        </div>
      </div>

      <div class="tools_item tools_item_single">
        <div class="tools_item_label">
          <el-icon><Checked /></el-icon>
        </div>
      </div>

      <div class="tools_item tools_item_single">
        <div class="tools_item_label">
          <SvgIcon name="yinyong" width="15px" height="15px" />
        </div>
      </div>

      <div class="tools_item tools_item_single">
        <div class="tools_item_label">@</div>
      </div>
    </div>
    <div class="tiptap_editor_content">
      <editor-content :editor="editor" />
      <TableRowMenus :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from "vue"
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import FileHandler from "@tiptap-pro/extension-file-handler"
import TextStyle from "@tiptap/extension-text-style"
import TextStyleExtend from "./extention/text-style-extend"
import Link from "@tiptap/extension-link"
// import Table from "@tiptap/extension-table"
import Table from "./extention/table"
// import TableCell from "@tiptap/extension-table-cell"
// import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
// import { getHierarchicalIndexes, TableOfContents } from "@tiptap-pro/extension-table-of-contents"

import TieleChange from "./title-change.vue"
import FontSizeChange from "./font-size-change.vue"
import fontColorChange from "./font-color-change.vue"
import UploadImage from "./upload-image.vue"
import LinkChange from "./link-change.vue"
import TableChange from "./table-change.vue"
import TableCell from "./extention/table-cell"
import TableHeader from "./extention/table-header"
import TableRowMenus from "./bubble-menus/table-row.vue"

const editor = useEditor({
  content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  extensions: [
    StarterKit,
    TaskList,
    TaskItem.configure({
      nested: true
    }),
    Highlight.configure({ multicolor: true }),
    Image,
    TextStyle,
    TextStyleExtend,
    FileHandler.configure({
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      onDrop: (currentEditor, files, pos) => {
        files.forEach((file) => {
          const fileReader = new FileReader()

          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(pos, {
                type: "image",
                attrs: {
                  src: fileReader.result
                }
              })
              .focus()
              .run()
          }
        })
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach((file) => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            console.log(htmlContent) // eslint-disable-line no-console
            return false
          }

          const fileReader = new FileReader()

          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor
              .chain()
              .insertContentAt(currentEditor.state.selection.anchor, {
                type: "image",
                attrs: {
                  src: fileReader.result
                }
              })
              .focus()
              .run()
          }
        })
      }
    }),
    Link.configure({
      openOnClick: true,
      defaultProtocol: "https"
    }),
    Table,
    TableRow,
    TableHeader,
    TableCell
  ]
})

const updateFontSize = (type: "add" | "sub") => {
  if (editor.value) {
    const currentFontSize = editor.value.getAttributes("textStyle").fontSize || 12
    ;(editor.value as any)
      .chain()
      .focus()
      .setFontSize(type === "add" ? currentFontSize + 1 : currentFontSize - 1)
      .run()
  }
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss">
.tiptap_editor {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  border-radius: 4px;
  width: 100%;
  min-height: 300px;

  .tiptap_editor_content {
    padding: 8px 20px;
  }

  .tiptap_editor_tools {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 8px;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
  }
  .tools_item {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #4f5052;
    border-radius: 4px;
    transition: all 0.3s;
    padding: 0 4px;
    margin-right: 4px;
    height: 32px;

    &:hover {
      cursor: default;
      background-color: rgba(231, 233, 238, 0.4);
    }

    .tools_item_label {
      margin-right: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .tools_item_label_text {
      line-height: 1.1;
    }
    .tools_item_label_line {
      width: 100%;
      height: 3px;
      background-color: #000;
    }

    .tools_item_label_vertical {
      min-width: 14px;

      .tools_item_label_text {
        font-size: 14px;
      }
    }
  }
  .tools_item_single {
    margin-right: 0;

    .tools_item_label {
      font-size: 15px;
      margin-right: 0%;
    }
  }
  .tools_item_active {
    background-color: rgba(231, 233, 238, 0.4);
  }

  .bubbleMenuContainer {
    background-color: #fff;
    border: 1px solid rgba(61, 37, 20, 0.05);
    border-radius: 0.7rem;
    box-shadow:
      0px 12px 33px 0px rgba(0, 0, 0, 0.06),
      0px 3.618px 9.949px 0px rgba(0, 0, 0, 0.04);
    display: flex;
    padding: 8px;
    flex-direction: column;
  }
}
.tiptap_editor_tools_head_item {
  display: flex;
  align-items: center;
  padding: 5px 20px;
  position: relative;

  .el-icon {
    margin-right: 4px;
    position: absolute;
    left: 5px;
  }
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  p {
    line-height: 24px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 16px;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 24px;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
  }

  h3 {
    font-size: 14px;
  }

  h4,
  h5,
  h6 {
    font-size: 12px;
  }

  blockquote {
    border-left: 3px solid rgba(61, 37, 20, 0.12);
    margin: 8px 0;
    padding-left: 8px;
  }

  ul,
  ol {
    padding: 0 8px;
    margin: 8px;
    line-height: 24px;

    li p {
      margin-top: 4px;
      margin-bottom: 4px;
    }
  }

  pre {
    background: #2e2b29;
    border-radius: 4px;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    margin: 8px 0;
    padding: 4px 8px;
    line-height: 24px;

    code {
      background: none;
      color: inherit;
      font-size: 12px;
      padding: 0;
    }
  }

  img {
    display: block;
    height: auto;
    margin: 8px 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid #6a00f5;
    }
  }

  ul[data-type="taskList"] {
    list-style: none;
    margin-left: 0;
    padding: 0;

    li {
      align-items: flex-start;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 4px;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }

    input[type="checkbox"] {
      cursor: pointer;
    }

    ul[data-type="taskList"] {
      margin: 0;
    }
  }

  code {
    background-color: rgba(88, 5, 255, 0.05);
    border-radius: 4px;
    color: #2e2b29;
    font-size: 12px;
    padding: 4px;
  }

  mark {
    background-color: #faf594;
    border-radius: 4px;
    box-decoration-break: clone;
    padding: 2px;
  }

  /* Link styles */
  a {
    color: #6a00f5;
    cursor: pointer;

    &:hover {
      color: #5800cc;
    }
  }

  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    // overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid rgba(61, 37, 20, 0.12);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin: 0;
      }
    }

    th {
      background-color: rgba(61, 37, 20, 0.05);
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: rgba(61, 37, 20, 0.08);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #6a00f5;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }

    .grip-row {
      position: absolute;
      z-index: 10;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.05);
      left: -0.75rem;
      top: 0;
      margin-top: -1px;
      height: calc(100% + 1px);
      width: 0.75rem;
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:hover:before {
        border-left: 2px;
        border-color: rgba(0, 0, 0, 0.6);
        border-style: dotted;
        height: 9px;
        content: "";
      }
      &.first {
        border-top-left-radius: 0.125rem;
        border-color: transparent;
      }
    }

    .grip-column {
      position: absolute;
      z-index: 10;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.05);
      left: 0;
      top: -0.75rem;
      margin-left: -1px;
      height: 0.75rem;
      width: calc(100% + 1px);
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      border-top-left-radius: 0.125rem;

      &.first {
        border-color: transparent;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:hover:before {
        border-top: 2px;
        border-color: rgba(0, 0, 0, 0.6);
        border-style: dotted;
        width: 9px;
        content: "";
      }
    }
  }

  .tableWrapper {
    margin: 1.5rem 0;
    // overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}
</style>
