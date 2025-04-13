<script setup lang="ts">
import { computed } from 'vue';
import { Badge } from 'primevue';

const props = defineProps<{
  queue: number[];
  maxFloor: number;
}>();

// Создаем массив всех этажей
const allFloors = computed(() => {
  return Array.from({ length: props.maxFloor }, (_, i) => props.maxFloor - i);
});

// Проверяем, есть ли этаж в очереди
function isInQueue(floor: number) {
  return props.queue.includes(floor);
}

// Определяем позицию этажа в очереди (для отображения порядка)
function getQueuePosition(floor: number) {
  return props.queue.indexOf(floor) + 1;
}
</script>

<template>
  <div class="elevator-queue">
    <div v-if="queue.length === 0" class="empty-queue text-center p-3 text-surface-500 dark:text-surface-400">
      <p>No requests in queue</p>
    </div>
    
    <div v-else class="queue-list space-y-2">
      <!-- Визуализация очереди как списка этажей -->
      <div v-for="floor in allFloors" :key="floor" 
          class="floor-item flex items-center p-2 rounded-md"
          :class="[isInQueue(floor) ? 'bg-surface-50 dark:bg-surface-900 border border-primary-200 dark:border-primary-800' : '']"
      >
        <div class="floor-number flex-1 font-medium">
          {{ floor === 1 ? 'Ground Floor' : `Floor ${floor}` }}
        </div>
        
        <Badge v-if="isInQueue(floor)" 
               :value="getQueuePosition(floor).toString()" 
               severity="info" 
               class="queue-position"
        />
      </div>
    </div>

    <!-- Показываем список очереди как плоский список -->
    <div v-if="queue.length > 0" class="queue-summary mt-4 pt-2 border-t border-surface-200 dark:border-surface-700">
      <div class="text-xs text-surface-500 dark:text-surface-400 mb-1">Queue Order:</div>
      <div class="flex flex-wrap gap-1">
        <Badge v-for="floor in queue" :key="floor" 
               :value="floor.toString()" 
               severity="secondary" 
               class="floor-badge"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.floor-item {
  transition: background-color 0.3s ease;
}

.floor-item:not(.in-queue):hover {
  background-color: var(--pv-surface-50);
}

.dark .floor-item:not(.in-queue):hover {
  background-color: var(--pv-surface-900);
}

.queue-position {
  min-width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floor-badge {
  min-width: 1.8rem;
}
</style> 