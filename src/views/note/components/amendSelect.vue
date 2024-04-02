<script setup>
import { noteGetClassService } from '@/api/note'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])

const classList = ref([])
const getClassList = async () => {
  const res = await noteGetClassService('/noteclass')
  classList.value = res.data
  // console.log(classList.value)
}
getClassList()
</script>
<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="Class in classList"
      :key="Class.id"
      :label="Class.classname"
      :value="Class.classsecondname"
    ></el-option>
  </el-select>
</template>
