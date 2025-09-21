<template>
  <div class="grid-cont">
    <div class="grid-item">
      <aside>
        <div class="logo">SH shopping</div>
        <ul class="flex-cont">
          <li class="flex-item">1</li>
          <li class="flex-item">2</li>
          <li class="flex-item">3</li>
          <li class="flex-item">4</li>
        </ul>
      </aside>
    </div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
  </div>
</template>

<script setup lant="ts">
definePageMeta({ layout: '' })
</script>

<style scoped>
.grid-cont {
  display: grid;
  width: 100vw;
  height: 100vh;
  /* border: 1px solid red; */
  /* grid-template-columns: repeat(3, 1fr); */
  grid-template-columns: 1fr 7fr;
  /* grid-template-rows: repeat(4, 1fr); */
  grid-template-rows: 1fr 8fr;
}
.grid-item {
  border: 1px solid blue;
  text-align: center;
  font-size: 3rem;
}
.grid-item:nth-child(1) {
  grid-row: 1/3;
  background-color: ffffff;
}
.grid-item:nth-child(2) {
  background-color: rgb(186, 227, 104);
}
.grid-item:nth-child(3) {
  background-color: rgb(230, 90, 209);
}
.flex-cont {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.flex-item {
  margin-bottom: 3rem;
}
aside {
  height: 100vh;
}
.logo {
  color: #ffffff;
  background-color: rgb(37, 130, 212);
}
</style>
