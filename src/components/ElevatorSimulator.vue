<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Elevator as ElevatorModel } from '@/core/elevator';
import ElevatorShaft from './ElevatorShaft.vue';
import ElevatorControls from './ElevatorControls.vue';
import ElevatorQueue from './ElevatorQueue.vue';
import { Button } from 'primevue';

// Настройки лифта
const maxFloor = ref(6);
const speed = ref(1);
const elevator = ref<ElevatorModel | null>(null);

// Референсы для реактивного состояния (т.к. лифт не реактивный)
const currentFloorRef = ref(1);
const stateRef = ref<'IDLE' | 'MOVING_UP' | 'MOVING_DOWN' | 'DOORS_OPENING' | 'DOORS_CLOSING'>('IDLE');
const directionRef = ref<'UP' | 'DOWN'>('UP');
const queueRef = ref<number[]>([]);

// Интервал для обновления состояния
let updateInterval: number | null = null;

// Создаем лифт при монтировании компонента
onMounted(() => {
  createElevator();
  startUpdateInterval();
});

// Удаляем лифт при размонтировании компонента
onUnmounted(() => {
  stopUpdateInterval();
  elevator.value?.destroy();
});

// Функция для создания лифта
function createElevator() {
  elevator.value?.destroy();
  elevator.value = new ElevatorModel({
    maxFloor: maxFloor.value,
    speed: speed.value,
  });
  
  // Инициализируем референсы
  updateElevatorState();
}

// Функция для обновления состояния лифта
function updateElevatorState() {
  if (elevator.value) {
    const elevatorInstance = elevator.value;
    console.log('Updating elevator state:', {
      currentFloor: elevatorInstance.currentFloor,
      state: elevatorInstance.state,
      direction: elevatorInstance.direction,
      queue: elevatorInstance.queue
    });
    
    currentFloorRef.value = elevatorInstance.currentFloor;
    stateRef.value = elevatorInstance.state;
    directionRef.value = elevatorInstance.direction;
    queueRef.value = [...elevatorInstance.queue];
  }
}

// Функция для старта интервала обновления
function startUpdateInterval() {
  stopUpdateInterval();
  console.log('Starting update interval');
  // Обновляем состояние каждые 100ms для имитации реактивности
  updateInterval = window.setInterval(() => {
    updateElevatorState();
  }, 100);
}

// Функция для остановки интервала обновления
function stopUpdateInterval() {
  if (updateInterval !== null) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
}

// Функция для вызова лифта с этажа
function callElevator(floor: number, direction: 'UP' | 'DOWN') {
  console.log('Calling elevator:', floor, direction);
  if (elevator.value) {
    elevator.value.call(floor, direction);
    // Немедленно обновляем состояние
    updateElevatorState();
  }
}

// Функция для выбора этажа из кабины
function selectFloor(floor: number) {
  console.log('Selecting floor:', floor);
  if (elevator.value) {
    elevator.value.selectFloor(floor);
    // Немедленно обновляем состояние
    updateElevatorState();
  }
}

// Функция для переключения темы
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}

// Обновляем лифт при изменении настроек
watch([maxFloor, speed], () => {
  createElevator();
  startUpdateInterval();
});
</script>

<template>
  <div class="elevator-simulator p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Elevator Simulator</h1>
      <Button icon="pi pi-moon" aria-label="Toggle theme" text rounded @click="toggleTheme" />
    </div>

    <div class="simulator-container grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Лифтовая шахта -->
      <div class="md:col-span-2 bg-surface-100 dark:bg-surface-800 rounded-lg p-4 shadow-md">
        <ElevatorShaft 
          :max-floor="maxFloor" 
          :current-floor="currentFloorRef" 
          :elevator-state="stateRef"
          :elevator-direction="directionRef"
          @call-elevator="callElevator" 
        />
      </div>

      <!-- Правая панель: Управление и очередь -->
      <div class="flex flex-col gap-4">
        <!-- Панель управления -->
        <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 shadow-md">
          <h2 class="text-lg font-semibold mb-3">Elevator Controls</h2>
          <ElevatorControls 
            :max-floor="maxFloor" 
            :current-floor="currentFloorRef"
            :elevator-state="stateRef"
            @select-floor="selectFloor" 
          />
        </div>

        <!-- Настройки лифта -->
        <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 shadow-md">
          <h2 class="text-lg font-semibold mb-3">Settings</h2>
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <label for="maxFloor">Max Floor:</label>
              <input id="maxFloor" v-model="maxFloor" type="number" min="2" max="20" class="w-20 p-2 rounded border" />
            </div>
            <div class="flex items-center justify-between">
              <label for="speed">Speed:</label>
              <input id="speed" v-model="speed" type="number" min="0.1" max="5" step="0.1" class="w-20 p-2 rounded border" />
            </div>
          </div>
        </div>

        <!-- Очередь лифта -->
        <div class="bg-surface-100 dark:bg-surface-800 rounded-lg p-4 shadow-md">
          <h2 class="text-lg font-semibold mb-3">Queue</h2>
          <ElevatorQueue :queue="queueRef" :max-floor="maxFloor" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.elevator-simulator {
  max-width: 1200px;
  margin: 0 auto;
}

input {
  background-color: var(--pv-surface-0);
  color: inherit;
}

.dark input {
  background-color: var(--pv-surface-700);
  border-color: var(--pv-surface-600);
  color: white;
}
</style> 