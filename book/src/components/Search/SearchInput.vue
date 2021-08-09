<template>
  <input
    placeholder="Szukaj"
    class="bg-gray-200 rounded-lg text-center text-4xl py-4 w-full"
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>