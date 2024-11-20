<template>
  <div>
    <slot name="prefix"></slot>
    <span class="typedText"> &nbsp;{{ typedText }} </span>
  </div>
</template>

<script setup lang="ts" name="typed">
import { onMounted } from 'vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    typedList: string[]
    speed?: number
    loop?: boolean
    spacing?: number
  }>(),
  {
    typedList: () => [],
    speed: 150,
    spacing: 3000,
    loop: true
  }
)

const typedText = ref('')

const loopListIdx = ref(0)
const loopItemIdx = ref(0)

const loopList = () => {
  const item = props.typedList[loopListIdx.value]
  loopItemIdx.value = 0
  typedText.value = ''
  if (item) {
    setTimeout(loopItem, props.spacing / 3)
  } else {
    loopListIdx.value = 0
    if (props.loop) {
      loopList()
    }
  }
}

const loopItem = () => {
  const item = props.typedList[loopListIdx.value][loopItemIdx.value++]
  if (item) {
    typedText.value += item
    setTimeout(loopItem, props.speed)
  } else {
    loopListIdx.value++
    setTimeout(loopList, props.spacing)
  }
}

onMounted(() => {
  loopList()
})
</script>

<style scoped>
.typedText::after {
  content: '|';
  color: #4e1fcd;
  animation: blink 1s infinite;
}
@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
