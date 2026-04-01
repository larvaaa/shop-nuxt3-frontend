<script lang="ts" setup>
import SearchButton from '~~/components/common/SearchButton.vue'
import Grid from '~~/components/common/Grid.vue'

const searchAddress = () => {}

const props = defineProps<{
  screenName: string
}>()

const columns = ref([
  {
    key: 'name',
    name: '이름',
  },
  {
    key: 'age',
    name: '나이',
  },
  {
    key: 'city',
    name: '도시',
  },
])

const list = ref([
  {
    name: 'tony',
    age: 20,
    city: 'seoul',
  },
  {
    name: 'tony',
    age: 20,
    city: 'seoul',
  },
  {
    name: 'tony',
    age: 20,
    city: 'seoul',
  },
])

definePageMeta({ layout: 'admin' })
</script>
<template>
  <LayoutPageScreenTitle v-if="props.screenName">{{
    props.screenName
  }}</LayoutPageScreenTitle>
  <form class="flex flex-col gap-4">
    <!-- grid 영역 start -->
    <div class="grid grid-cols-2 gap-5 border-stone-300 p-2 border">
      <div class="flex flex-row justify-center items-center">
        <label class="text-start basis-1/6 text-gray-700 mb-1" for="name"
          >가게명</label
        >
        <input
          id="name"
          type="text"
          class="basis-5/6 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="가게명을 입력하세요"
        />
      </div>
      <div class="flex flex-row items-center">
        <label class="text-start basis-1/6 text-gray-700 mb-1" for="phone"
          >전화번호</label
        >
        <input
          id="phone"
          type="number"
          class="basis-5/6 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="전화번호를 입력하세요"
        />
      </div>
      <div class="flex flex-row items-center">
        <label class="text-start basis-1/6 text-gray-700 mb-1" for="address"
          >주소</label
        >
        <span class="basis-5/6 flex flex-row items-center gap-5">
          <textarea
            id="address"
            class="basis-5/6 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            rows="3"
            placeholder="주소를 입력하세요"
          ></textarea>
          <span>
            <input
              class="border mb-3"
              readonly
              type="text"
              placeholder="우편번호"
            />
            <SearchButton class="p-1" @click="searchAddress"
              >주소 검색</SearchButton
            >
          </span>
        </span>
      </div>
      <div class="flex flex-row items-center text-start">
        <label class="basis-1/6 text-gray-700 mb-1" for="address_detail"
          >상세주소</label
        >
        <textarea
          id="address_detail"
          class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 basis-5/6"
          rows="3"
          placeholder="상세주소를 입력하세요"
        ></textarea>
      </div>
      <div class="flex flex-row items-center text-start">
        <label class="basis-1/6 text-gray-700 mb-1" for="category"
          >카테고리</label
        >
        <select
          id="category"
          class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 basis-5/6"
        ></select>
      </div>
      <div class="flex flex-row items-center text-start">
        <label class="basis-1/6 text-gray-700 mb-1" for="brand">브랜드</label>
        <span class="basis-5/6 flex flex-row items-center gap-5">
          <input
            id="brand"
            type="text"
            readonly
            class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 basis-5/6"
          />
          <SearchButton class="p-1" @click="searchAddress"
            >브랜드 검색</SearchButton
          >
        </span>
      </div>
      <div class="flex flex-row items-center text-start">
        <label class="basis-1/6 text-gray-700 mb-1" for="time"
          >예상배달시간 (분)</label
        >
        <input
          id="time"
          class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 basis-5/6"
        />
      </div>
      <div class="flex flex-row items-center text-start">
        <label class="basis-1/6 text-gray-700 mb-1" for="price"
          >최소주문금액 (원)</label
        >
        <input
          id="price"
          class="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 basis-5/6"
        />
      </div>
    </div>
    <!-- grid 영역 end -->
    <!-- 영업시간 테이블 영역 시작 -->
    <div>
      <Grid class="mb-10" :columns="columns" :list="list"></Grid>
    </div>
    <!-- 영업시간 테이블 영역 끝 -->
  </form>
  <button
    type="submit"
    class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
    등록하기
  </button>
</template>
