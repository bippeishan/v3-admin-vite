import { Extension } from "@tiptap/core"

export default Extension.create({
  name: "TextStyleExtend",

  addOptions() {
    return {
      types: ["textStyle"]
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => {
              const fontSize = element.style.fontSize.match(/[0-9]+/)
              return Number(fontSize)
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}px`
              }
            }
          },
          color: {
            default: null,
            parseHTML: (element) => {
              return element.style.color
            },
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {}
              }

              return {
                style: `color: ${attributes.color}`
              }
            }
          },
          backgroundColor: {
            default: null,
            parseHTML: (element) => {
              return element.style.backgroundColor
            },
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {}
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`
              }
            }
          }
        }
      }
    ]
  },

  // @ts-ignore
  addCommands() {
    return {
      setFontSize:
        (fontSize: number) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run()
        },
      setFontColor:
        (color: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { color }).run()
        },
      setBackgroundColor:
        (backgroundColor: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { backgroundColor }).run()
        }
    }
  }
})
