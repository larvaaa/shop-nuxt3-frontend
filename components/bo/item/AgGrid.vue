<script lang="ts" setup generic="T">
import { AgGridVue } from 'ag-grid-vue3'
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])
const myTheme = themeQuartz
</script>

<template>
  <div>
    <ClientOnly>
      <ag-grid-vue style="width: 100%; height: 100%" v-bind="$attrs">
      </ag-grid-vue>
    </ClientOnly>
  </div>
</template>
