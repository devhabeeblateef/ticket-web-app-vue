<template>
  <div
    class="fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow text-white"
    :class="{
      'bg-green-600': type === 'success',
      'bg-red-600': type === 'error'
    }"
  >
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
  type: String
})
</script>
