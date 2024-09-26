<template>
  <el-input type="password" show-password v-model="inputValue" />
  <div class="strengthWrapper" v-if="inputValue">
    <div class="strengthWrapper-item" :class="strengthClass">弱</div>
    <div class="strengthWrapper-item" :class="strengthClass">中</div>
    <div class="strengthWrapper-item" :class="strengthClass">强</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import zxcvbn from "zxcvbn"

const inputValue = defineModel<string>({ required: true })

const strengthClass = computed(() => {
  const strength = zxcvbn(inputValue.value)

  switch (strength.score) {
    case 0:
    case 1:
      return { "strengthWrapper-weak": true }
    case 2:
    case 3:
      return { "strengthWrapper-middle": true }
    case 4:
      return { "strengthWrapper-high": true }
    default:
      return {}
  }
})
</script>

<style lang="scss" scoped>
.strengthWrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 4px;
  height: 24px;

  .strengthWrapper-item {
    background-color: #ebedf5;
    width: 100%;
    margin-right: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .strengthWrapper-weak:first-of-type {
    background-color: #f7736b;
  }

  .strengthWrapper-middle:first-of-type,
  .strengthWrapper-middle:nth-of-type(2) {
    background-color: #ffd042;
  }

  .strengthWrapper-high {
    background-color: #43c858;
  }
}
</style>
