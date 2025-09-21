<template>
  <div class="flex-container">
    <aside class="flex-container">
      <div class="logo">
        <span
          ><strong>SH<br />shopping</strong></span
        >
      </div>
      <ul class="flex-container">
        <li class="flex-item"><a href="#">주문</a></li>
        <li class="flex-item"><a href="#">결제</a></li>
        <li class="flex-item"><a href="#">상품</a></li>
        <li class="flex-item"><a href="#">입점업체</a></li>
        <li class="flex-item"><a href="#">전시</a></li>
        <li class="flex-item"><a href="#">제휴</a></li>
        <li class="flex-item"><a href="#">고객센터</a></li>
        <li class="flex-item"><a href="#">배송</a></li>
        <li class="flex-item"><a href="#">정산</a></li>
        <li class="flex-item"><a href="#">회원</a></li>
      </ul>
    </aside>
    <div>
      <nav>
        <ul class="flex-container">
          <li class="flex-item" :class="{ selected: 1 === selected }">
            <a @click="selected = 1">주문</a>
          </li>
          <li class="flex-item" :class="{ selected: 2 === selected }">
            <a @click="selected = 2">결제</a>
          </li>
          <li class="flex-item" :class="{ selected: 3 === selected }">
            <a @click="selected = 3">상품</a>
          </li>
          <li class="flex-item" :class="{ selected: 4 === selected }">
            <a @click="selected = 4">전시</a>
          </li>
          <li class="flex-item" :class="{ selected: 5 === selected }">
            <a @click="selected = 5">고객센터</a>
          </li>
        </ul>
      </nav>
      <main>
        <div>item1</div>
        <div>item2</div>
        <div>item3</div>
        <div>item4</div>
        <div>item5</div>
        <div>item6</div>
        <div>item7</div>
        <div>item8</div>
        <div>item9</div>
        <div>item10</div>
        <div>item11</div>
        <div>item12</div>
      </main>
    </div>
  </div>
</template>

<script setup lant="ts">
definePageMeta({ layout: '' })

const selected = ref() // 선택된 메뉴
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
div.flex-container {
  display: flex;
}
.logo {
  text-align: center;
  font-size: 2.5rem;
  height: 20vh;
  background-color: rgb(66, 139, 234);
  color: #ffffff;
  border-radius: 0 30px 0 0;
  vertical-align: middle;
}
.logo > span {
  /* transform: translateY(0.7rem); */
  /* display: inline-block; */
}
.flex-item {
  text-align: left;
  font-size: 30px;
  height: 5vh;
  margin: 10px;
  /* background-color: darkmagenta; */
}
.flex-item:hover {
}
aside.flex-container {
  position: relative;
  display: flex;
  flex-direction: column;
  /* background-color: cadetblue; */
  border-right: 1px solid rgb(22, 28, 22, 0.2);
  border-top: 1px solid rgb(22, 28, 22, 0.2);
  border-bottom: 1px solid rgb(22, 28, 22, 0.2);
  /* opacity: 50%; */
  border-radius: 0 30px 30px 0;
  height: 90vh;
  width: 10vw;
  transform: translateY(3rem);
}
aside .flex-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Courier New', Courier, monospace;
}
aside .flex-item > a {
  display: block;
}
aside .flex-item:hover {
  background-color: rgb(0, 0, 0, 0.05);
}
nav > .flex-container {
  justify-content: space-around;
  display: flex;
  background-color: darkkhaki;
  width: 70vw;
  transform: translateX(50px);
}
.flex-item.selected {
  background-color: cornflowerblue;
}
main {
  margin: 50px;
  /* height: 80vh; */
  width: 75vw;
  background-color: darkgrey;
  transform: translateX(35px);
  display: flex;
  flex-wrap: wrap;
}
main > div {
  background-color: lightcoral;
  width: 200px;
  height: 300px;
  margin: 20px;
}
/* 노멀라이즈 시작 */
body,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}

/* 노멀라이즈 끝 */
</style>
