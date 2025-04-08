<script setup lang="ts">
import {ref} from "vue"
import {Button, Select} from "primevue"

const selectedCity = ref()
const cities = ref([
  {name: "New York", code: "NY"},
  {name: "Rome", code: "RM"},
  {name: "London", code: "LDN"},
  {name: "Istanbul", code: "IST"},
  {name: "Paris", code: "PRS"},
])
function toggleTheme() {
  document.documentElement.classList.toggle("dark")
}
</script>

<template>
  <div class="w-svw h-svh flex items-center justify-center">
    <Button label="Toggle Theme" @click="toggleTheme" />
    <div class="card flex justify-center">
      <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
    </div>
  </div>
</template>
