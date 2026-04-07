<script lang="ts" setup>
const searchAddress = () => {}

const props = defineProps<{
  screenName: string
}>()

// 컬럼 속성 정의
const columns = ref([
  { headerName: '요일', field: 'dayOfWeek' },
  { headerName: '오픈시간', field: 'openTime' },
  { headerName: '마감시간', field: 'closeTime' },
  { headerName: '휴게 시작시간', field: 'breakStart' },
  { headerName: '휴게 종료시간', field: 'breakEnd' },
  { headerName: '정기휴무일여부', field: 'isDayOff' },
])

// 기본 컬럼 속성 (모든 컬럼에 공통 적용)
const defaultColDef = ref({
  sortable: true,
  filter: false,
  flex: 1,
})

// 그리드에 표시될 데이터
const list = ref([
  {
    dayOfWeek: '월',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
  {
    dayOfWeek: '화',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
  {
    dayOfWeek: '수',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
  {
    dayOfWeek: '목',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
  {
    dayOfWeek: '금',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
  {
    dayOfWeek: '토',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
  {
    dayOfWeek: '일',
    openTime: '11:00',
    closeTime: '23:00',
    breakStart: '15:00',
    breakEnd: '16:00',
    isDayOff: 'Y',
  },
])

definePageMeta({ layout: 'admin' })
</script>
<template>
  <BoItemScreenHeader v-if="props.screenName" :show-register="true">{{
    props.screenName
  }}</BoItemScreenHeader>
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
            <BoItemSearchButton class="p-1" @click="searchAddress"
              >주소 검색</BoItemSearchButton
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
          <BoItemSearchButton class="p-1" @click="searchAddress"
            >브랜드 검색</BoItemSearchButton
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
      <BoItemAgGrid
        class="mb-10 h-80 w-full"
        :column-defs="columns"
        :row-data="list"
        :default-col-def="defaultColDef"
      ></BoItemAgGrid>
    </div>
    <!-- 영업시간 테이블 영역 끝 -->
  </form>
</template>
