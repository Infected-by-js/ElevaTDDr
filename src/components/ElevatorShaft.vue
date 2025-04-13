<script setup lang="ts">
import { computed } from 'vue';
import { Button } from 'primevue';
import type { ElevatorState, ElevatorDirection } from '@/core/elevator/types';

const props = defineProps<{
  maxFloor: number;
  currentFloor: number;
  elevatorState: ElevatorState;
  elevatorDirection: ElevatorDirection;
}>();

const emit = defineEmits<{
  'call-elevator': [floor: number, direction: 'UP' | 'DOWN'];
}>();

// Создаем массив этажей в обратном порядке (сверху вниз)
const floors = computed(() => {
  return Array.from({ length: props.maxFloor }, (_, i) => props.maxFloor - i);
});

// Функция для определения, движется ли лифт в данный момент
const isMoving = computed(() => {
  return props.elevatorState === 'MOVING_UP' || props.elevatorState === 'MOVING_DOWN';
});

// Определяем, доступна ли кнопка вызова вверх для данного этажа
function canCallUp(floor: number) {
  return floor < props.maxFloor;
}

// Определяем, доступна ли кнопка вызова вниз для данного этажа
function canCallDown(floor: number) {
  return floor > 1;
}

// Вызов лифта
function callElevator(floor: number, direction: 'UP' | 'DOWN') {
  emit('call-elevator', floor, direction);
}

// Проверяем, находится ли лифт на данном этаже
function isElevatorAtFloor(floor: number) {
  return props.currentFloor === floor;
}

// Стили для кабины лифта
const elevatorStyle = computed(() => {
  const animationDuration = '0.5s';
  
  // Расчет позиции лифта: начинаем с нижнего этажа (1) и движемся вверх
  // Шахта делится на равные части по количеству этажей
  // Формула: 100 - (текущий этаж - 1) / (всего этажей - 1) * 100
  // Если maxFloor = 1, избегаем деления на ноль
  const floorPosition = props.maxFloor === 1 ? 0 : 
    100 - ((props.currentFloor - 1) / (props.maxFloor - 1)) * 100;
  
  return {
    transition: `transform ${animationDuration} ease-in-out`,
    transform: `translateY(${floorPosition}%)`,
  };
});
</script>

<template>
  <div class="elevator-shaft relative">
    <!-- Этажи -->
    <div class="floors-container grid gap-4">
      <div v-for="floor in floors" :key="floor" class="floor relative px-4 py-6 bg-surface-50 dark:bg-surface-700 rounded-lg flex items-center border-b-2 border-surface-200 dark:border-surface-600">
        <div class="floor-info flex-1">
          <div class="floor-number font-bold text-lg">{{ floor }}</div>
          <div class="floor-name text-sm text-surface-600 dark:text-surface-300">
            {{ floor === 1 ? 'Ground Floor' : `Floor ${floor}` }}
          </div>
        </div>
        
        <!-- Кнопки вызова лифта -->
        <div class="call-buttons flex flex-col gap-2">
          <Button 
            v-if="canCallUp(floor)" 
            icon="pi pi-chevron-up" 
            size="small" 
            severity="secondary"
            :disabled="isElevatorAtFloor(floor) && !isMoving"
            aria-label="Call elevator up"
            @click="callElevator(floor, 'UP')"
          />
          <Button 
            v-if="canCallDown(floor)" 
            icon="pi pi-chevron-down" 
            size="small" 
            severity="secondary"
            :disabled="isElevatorAtFloor(floor) && !isMoving"
            aria-label="Call elevator down"
            @click="callElevator(floor, 'DOWN')"
          />
        </div>
      </div>
    </div>
    
    <!-- Шахта лифта с кабиной -->
    <div class="elevator-animation absolute top-0 right-8 bottom-0 w-16 bg-surface-200 dark:bg-surface-600 rounded-lg overflow-hidden">
      <!-- Кабина лифта -->
      <div 
        class="elevator-cab absolute top-0 left-0 right-0 h-16 bg-primary-500 dark:bg-primary-600 rounded-md m-1" 
        :style="elevatorStyle"
      >
        <!-- Индикаторы направления движения и текущий этаж -->
        <div class="elevator-indicators flex justify-center items-center h-full">
          <div class="flex flex-col items-center justify-center">
            <span class="text-white font-bold text-sm">Floor</span>
            <span class="text-white font-bold text-xl">{{ currentFloor }}</span>
            <i 
              v-if="elevatorState === 'MOVING_UP'" 
              class="pi pi-arrow-up text-white text-sm mt-1"
            ></i>
            <i 
              v-else-if="elevatorState === 'MOVING_DOWN'" 
              class="pi pi-arrow-down text-white text-sm mt-1"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.elevator-shaft {
  height: calc(100% - 2rem);
  min-height: 400px;
}

.floors-container {
  height: 100%;
  grid-template-rows: repeat(auto-fit, 1fr);
}

.floor {
  position: relative;
  min-height: 70px;
}
</style> 