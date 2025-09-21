<template>
  <div class="max-w-xl mx-auto mt-10 p-8 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6">상품 등록</h2>
    <form class="space-y-4">
      <div>
        <label class="block text-gray-700 mb-1" for="name">상품명</label>
        <input
          id="name"
          type="text"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="상품명을 입력하세요"
        />
      </div>
      <div>
        <label class="block text-gray-700 mb-1" for="price">가격</label>
        <input
          id="price"
          type="number"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="가격을 입력하세요"
        />
      </div>
      <div>
        <label class="block text-gray-700 mb-1" for="description">설명</label>
        <textarea
          id="description"
          class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          rows="3"
          placeholder="상품 설명을 입력하세요"
        ></textarea>
      </div>
      <div>
        <label class="block text-gray-700 mb-1" for="image">이미지</label>
        <input id="image" type="file" class="w-full" />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        등록하기
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'admin' })
</script>
