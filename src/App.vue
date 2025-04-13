<script setup lang="ts">
import { onMounted } from 'vue';
import ElevatorSimulator from '@/components/ElevatorSimulator.vue';

onMounted(() => {
  console.log('App mounted, initializing elevator simulator...');
});
</script>

<template>
  <div class="app-container min-h-screen bg-surface-50 dark:bg-surface-950 text-surface-900 dark:text-surface-50 p-4">
    <ElevatorSimulator />
  </div>
</template>

<style>
body {
  font-family: var(--default-font-family);
  margin: 0;
  padding: 0;
}

.app-container {
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
