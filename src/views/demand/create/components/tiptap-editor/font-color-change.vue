<template>
  <el-popover placement="bottom" :width="240" trigger="click" :show-arrow="false" :visible="visible">
    <template #reference>
      <div class="tools_item" @click="visible = true" ref="popoverRefrenceRef">
        <div class="tools_item_label tools_item_label_vertical">
          <div class="tools_item_label_text" v-if="type === 'color'">A</div>
          <SvgIcon name="bucket" width="16px" height="16px" v-if="type === 'bg'" />
          <div class="tools_item_label_line" :style="colorClass" />
        </div>
        <el-icon color="#9B9C9D"><CaretBottom /></el-icon>
      </div>
    </template>

    <template #default>
      <div ref="popoverContentRef">
        <div class="changeColor_group">
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_gray_${it}`"
              @click="handleSelectColor('gray', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_red_${it}`"
              @click="handleSelectColor('red', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_orange_${it}`"
              @click="handleSelectColor('orange', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_gold_${it}`"
              @click="handleSelectColor('gold', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_yellow_${it}`"
              @click="handleSelectColor('yellow', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_green_${it}`"
              @click="handleSelectColor('green', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_cyan_${it}`"
              @click="handleSelectColor('cyan', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_blue_${it}`"
              @click="handleSelectColor('blue', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_purple_${it}`"
              @click="handleSelectColor('purple', it)"
            />
          </div>
          <div class="changeColor">
            <div
              v-for="it in [1, 2, 3, 4, 5, 6]"
              :key="it"
              :class="`changeColor_item changeColor_magenta_${it}`"
              @click="handleSelectColor('magenta', it)"
            />
          </div>
        </div>
        <div>
          <span>更多颜色</span>
          <el-color-picker
            size="small"
            popper-class="color_picker_wrapper"
            :show-alpha="true"
            @change="handleColorChange"
          />
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"

const { editor, type } = defineProps<{ editor: any; type: "color" | "bg" }>()

const visible = ref(false)
const popoverContentRef = ref(null)
const popoverRefrenceRef = ref(null)

const colorClass = computed(() => {
  const color =
    type === "color" ? editor.getAttributes("textStyle").color : editor.getAttributes("textStyle").backgroundColor
  return {
    backgroundColor: color || "#000"
  }
})

onMounted(() => {
  document.addEventListener("click", (e) => {
    const colorPickerDom = document.getElementsByClassName("color_picker_wrapper")[0]
    if (
      !!popoverContentRef.value &&
      !!popoverRefrenceRef.value &&
      !!visible.value &&
      !(popoverRefrenceRef.value as any).contains(e.target) &&
      !(popoverContentRef.value as any).contains(e.target) &&
      !colorPickerDom?.contains(e.target as any)
    ) {
      visible.value = false
    }
  })
})

onUnmounted(() => {
  document.removeEventListener("click", (e) => {
    const colorPickerDom = document.getElementsByClassName("color_picker_wrapper")[0]
    if (
      !!popoverContentRef.value &&
      !!popoverRefrenceRef.value &&
      !!visible.value &&
      !(popoverRefrenceRef.value as any).contains(e.target) &&
      !(popoverContentRef.value as any).contains(e.target) &&
      !colorPickerDom?.contains(e.target as any)
    ) {
      visible.value = false
    }
  })
})

const handleSelectColor = (colorType: string, idx: number) => {
  visible.value = false

  let color = ""
  switch (colorType) {
    case "gray":
      color = ["#ffffff", "#d9d9d9", "#bfbfbf", "#8c8c8c", "#434343", "#000000"][idx - 1]
      break
    case "red":
      color = ["#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#a8071a"][idx - 1]
      break
    case "orange":
      color = ["#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#ad4e00"][idx - 1]
      break
    case "gold":
      color = ["#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#ad6800"][idx - 1]
      break
    case "yellow":
      color = ["#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#ad8b00"][idx - 1]
      break
    case "green":
      color = ["#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#237804"][idx - 1]
      break
    case "cyan":
      color = ["#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#006d75"][idx - 1]
      break
    case "blue":
      color = ["#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#003eb3"][idx - 1]
      break
    case "purple":
      color = ["#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#391085"][idx - 1]
      break
    case "magenta":
      color = ["#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#9e1068"][idx - 1]
      break
  }
  if (type === "color") {
    editor.chain().focus().setFontColor(color).run()
  } else {
    editor.chain().focus().setBackgroundColor(color).run()
  }
}

const handleColorChange = (val: string) => {
  console.log("handleColorChange:", val)
}
</script>

<style lang="scss">
.changeColor_group {
  display: flex;
}
.changeColor {
  display: flex;
  flex-direction: column;
  margin-right: 4px;

  .changeColor_item {
    width: 18px;
    height: 18px;
    margin-bottom: 4px;
    border: 1px solid #ddd;

    &:hover {
      border: 2px solid #ddd;
    }
  }

  // 2,3,4,5,6,8
  $gray_colors: (
    1: #ffffff,
    2: #d9d9d9,
    3: #bfbfbf,
    4: #8c8c8c,
    5: #434343,
    6: #000000
  );
  @each $name, $color in $gray_colors {
    .changeColor_gray_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $red_colors: (
    1: #ffccc7,
    2: #ffa39e,
    3: #ff7875,
    4: #ff4d4f,
    5: #f5222d,
    6: #a8071a
  );
  @each $name, $color in $red_colors {
    .changeColor_red_#{$name} {
      background-color: $color;
    }
  }

  // 2,3,4,5,6,8
  $orange_colors: (
    1: #ffe7ba,
    2: #ffd591,
    3: #ffc069,
    4: #ffa940,
    5: #fa8c16,
    6: #ad4e00
  );
  @each $name, $color in $orange_colors {
    .changeColor_orange_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $gold_colors: (
    1: #fff1b8,
    2: #ffe58f,
    3: #ffd666,
    4: #ffc53d,
    5: #faad14,
    6: #ad6800
  );
  @each $name, $color in $gold_colors {
    .changeColor_gold_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $yellow_colors: (
    1: #ffffb8,
    2: #fffb8f,
    3: #fff566,
    4: #ffec3d,
    5: #fadb14,
    6: #ad8b00
  );
  @each $name, $color in $yellow_colors {
    .changeColor_yellow_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $green_colors: (
    1: #d9f7be,
    2: #b7eb8f,
    3: #95de64,
    4: #73d13d,
    5: #52c41a,
    6: #237804
  );
  @each $name, $color in $green_colors {
    .changeColor_green_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $cyan_colors: (
    1: #b5f5ec,
    2: #87e8de,
    3: #5cdbd3,
    4: #36cfc9,
    5: #13c2c2,
    6: #006d75
  );
  @each $name, $color in $cyan_colors {
    .changeColor_cyan_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $blue_colors: (
    1: #bae0ff,
    2: #91caff,
    3: #69b1ff,
    4: #4096ff,
    5: #1677ff,
    6: #003eb3
  );
  @each $name, $color in $blue_colors {
    .changeColor_blue_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $purple_colors: (
    1: #efdbff,
    2: #d3adf7,
    3: #b37feb,
    4: #9254de,
    5: #722ed1,
    6: #391085
  );
  @each $name, $color in $purple_colors {
    .changeColor_purple_#{$name} {
      background-color: $color;
    }
  }
  // 2,3,4,5,6,8
  $magenta_colors: (
    1: #ffd6e7,
    2: #ffadd2,
    3: #ff85c0,
    4: #f759ab,
    5: #eb2f96,
    6: #9e1068
  );
  @each $name, $color in $magenta_colors {
    .changeColor_magenta_#{$name} {
      background-color: $color;
    }
  }
}
</style>
