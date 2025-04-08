<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
}>()

const count = ref(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p data-testid="count">Count: {{ count }}</p>
    <div>
      <button data-testid="increment-button" @click="increment">Increment</button>
      <button data-testid="decrement-button" @click="decrement">Decrement</button>
    </div>
  </div>
</template> 