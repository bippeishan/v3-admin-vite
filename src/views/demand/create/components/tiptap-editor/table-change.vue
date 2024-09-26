<template>
  <el-popover
    ref="popoverRef"
    placement="bottom"
    :width="170"
    trigger="click"
    :show-arrow="false"
    @after-leave="handleAfterLeave"
  >
    <template #reference>
      <div class="tools_item">
        <div class="tools_item_label tools_item_label_vertical">
          <SvgIcon name="table" width="15px" height="15px" />
        </div>
        <el-icon color="#9B9C9D"><CaretBottom /></el-icon>
      </div>
    </template>

    <template #default>
      <div>
        <div class="tiptap_tableBlocksLabel">
          {{ selectedMap.row ? `${selectedMap.row}x${selectedMap.col}` : "插入" }}表格
        </div>
        <div class="tiptap_tableBlocksWrapper">
          <div
            class="tiptap_selectedTableBlocks"
            v-for="it in tableBlocksMap"
            :key="it.idx"
            @mouseenter="() => handleMouseEnter(it)"
            :class="{
              tiptap_tableBlockActive: !!selectedMap.row && it.row <= selectedMap.row && it.col <= selectedMap.col
            }"
            @click="() => handleBlockClick(it)"
          />
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from "vue"

const { editor } = defineProps<{ editor: any }>()

const popoverRef = ref()

interface DataMap {
  idx: number
  row: number
  col: number
}

const tableBlocks = Array.from({ length: 80 }, (_, i) => i + 1)
const tableBlocksMap: DataMap[] = []
tableBlocks.forEach((it) => {
  const row = Math.ceil(it / 10)
  const col = it % 10 === 0 ? 10 : it % 10
  tableBlocksMap.push({ idx: it, row, col })
})

const selectedMap = ref<DataMap>({} as DataMap)
const handleMouseEnter = (info: DataMap) => {
  selectedMap.value = info
}

const handleAfterLeave = () => {
  selectedMap.value = {} as DataMap
}

const handleBlockClick = (_it: DataMap) => {
  popoverRef.value?.hide?.()
  editor.commands.insertTable({ rows: selectedMap.value.row, cols: selectedMap.value.col, withHeaderRow: true })
}
</script>

<style lang="scss">
.tiptap_tableBlocksLabel {
  font-size: 12px;
  margin-bottom: 8px;
}
.tiptap_tableBlocksWrapper {
  display: flex;
  flex-wrap: wrap;
}
.tiptap_selectedTableBlocks {
  width: 10px;
  height: 10px;
  background-color: #e8e3ea;
  border: 1px solid #aba9ae;
  margin-right: 4px;
  margin-bottom: 4px;
  flex: none;
}
.tiptap_tableBlockActive {
  background-color: #7b9ef6;
  border: 1px solid #3266e8;
}
</style>
