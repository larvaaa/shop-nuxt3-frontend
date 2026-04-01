<script lang="ts" setup generic="T">
interface Column {
  key: string
  name: string
}

const props = defineProps<{
  columns: Column[]
  list: T[]
}>()
</script>
<template>
  <div class="border border-gray-400 w-full">
    <table class="w-full divide-y divide-gray-300">
      <thead class="bg-slate-400">
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        <tr v-for="(item, index) in list" :key="index">
          <td class="text-center" v-for="col in columns" :key="col.key">
            {{ item[col.key as keyof T] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
