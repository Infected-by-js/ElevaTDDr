<script setup lang="ts">
import { computed } from 'vue';
import { Button } from 'primevue';
import type { ElevatorState } from '@/core/elevator/types';

const props = defineProps<{
  maxFloor: number;
  currentFloor: number;
  elevatorState: ElevatorState;
}>();

const emit = defineEmits<{
  'select-floor': [floor: number];
}>();

// Создаем массив этажей в обратном порядке (сверху вниз) для кнопок
const floorButtons = computed(() => {
  const floors = [];
  for (let i = props.maxFloor; i >= 1; i--) {
    floors.push(i);
  }
  
  // Группируем кнопки по 3 в ряд
  const rows = [];
  for (let i = 0; i < floors.length; i += 3) {
    rows.push(floors.slice(i, i + 3));
  }
  return rows;
});

// Определяем, движется ли лифт в данный момент
const isMoving = computed(() => {
  return props.elevatorState === 'MOVING_UP' || props.elevatorState === 'MOVING_DOWN';
});

// Функция выбора этажа
function selectFloor(floor: number) {
  if (floor !== props.currentFloor) {
    emit('select-floor', floor);
  }
}

// Определяем, активна ли кнопка этажа
function isFloorActive(floor: number) {
  return props.currentFloor === floor;
}
</script>

<template>
  <div class="elevator-controls">
    <!-- Информация о текущем этаже и состоянии -->
    <div class="elevator-display mb-4 p-3 bg-surface-50 dark:bg-surface-900 rounded-lg text-center border border-primary-200 dark:border-primary-800">
      <div class="current-floor text-4xl font-bold text-primary-600 dark:text-primary-500">
        {{ currentFloor }}
      </div>
      <div class="elevator-status text-sm text-surface-600 dark:text-surface-400">
        <span v-if="elevatorState === 'IDLE'">IDLE</span>
        <span v-else-if="elevatorState === 'MOVING_UP'" class="flex items-center justify-center gap-1">
          MOVING <i class="pi pi-arrow-up"></i>
        </span>
        <span v-else-if="elevatorState === 'MOVING_DOWN'" class="flex items-center justify-center gap-1">
          MOVING <i class="pi pi-arrow-down"></i>
        </span>
        <span v-else>{{ elevatorState }}</span>
      </div>
    </div>
    
    <!-- Кнопки выбора этажа -->
    <div class="floor-buttons">
      <div v-for="(row, rowIndex) in floorButtons" :key="rowIndex" class="grid grid-cols-3 gap-2 mb-2">
        <Button 
          v-for="floor in row" 
          :key="floor"
          :label="floor.toString()"
          size="small"
          :severity="isFloorActive(floor) ? 'success' : 'secondary'"
          :disabled="isFloorActive(floor) && !isMoving"
          aria-label="Select floor"
          class="w-full h-12"
          @click="selectFloor(floor)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.elevator-controls {
  min-height: 200px;
}
</style> 