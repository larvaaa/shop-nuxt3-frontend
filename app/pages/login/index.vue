<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})

const signUpForm = ref({
  loginId: '',
  loginPw: '',
  mobileNumber: '',
  name: '',
})
const loginForm = ref({
  loginId: '',
  loginPw: '',
})

interface LoginResponse {
  accessToken: string
  tokenType: string
}

const accessToken = ref('')

async function login() {
  const { data, error } = await useFetch<LoginResponse>(
    'http://localhost:8080/login',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: loginForm,
      credentials: 'include',
    },
  )
  accessToken.value = data.value!.accessToken
}

async function signUp() {
  const { data, error } = await useFetch('http://localhost:8080/signUp', {
    method: 'post',
    body: signUpForm,
  })

  signUpForm.value.loginId = ''
  signUpForm.value.loginPw = ''
  signUpForm.value.mobileNumber = ''
  signUpForm.value.name = ''
}

async function healthCheck() {
  const { data, error } = await useFetch('http://localhost:8080/healthCheck', {
    method: 'get',
  })
}
</script>

<template>
  <form>
    <label for="id">아이디</label>
    <!-- <input type="text" id="id" v-model="form.id" /><br /><br /> -->
    <AwesomeFormTextInput
      id="id"
      v-model="loginForm.loginId"
      size="md"
      class="w-full md:w-2/3"
    />
    <label for="password">비밀번호</label>
    <!-- <input type="password" id="password" v-model="form.pw" /> -->
    <AwesomeFormTextInput
      id="password"
      v-model="loginForm.loginPw"
      size="md"
      class="w-full md:w-2/3"
    />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="login"
      type="secondary"
      size="md"
      @click.prevent="login"
    />
    <p>accessToken = {{ accessToken }}</p>
  </form>

  <form>
    <label for="id">아이디</label>
    <AwesomeFormTextInput
      id="id"
      v-model="signUpForm.loginId"
      size="md"
      class="w-full md:w-2/3"
    />
    <label for="password">비밀번호</label>
    <AwesomeFormTextInput
      id="password"
      v-model="signUpForm.loginPw"
      size="md"
      class="w-full md:w-2/3"
    />
    <label for="password">이름</label>
    <AwesomeFormTextInput
      id="password"
      v-model="signUpForm.name"
      size="md"
      class="w-full md:w-2/3"
    />
    <label for="password">전화번호</label>
    <AwesomeFormTextInput
      id="password"
      v-model="signUpForm.mobileNumber"
      size="md"
      class="w-full md:w-2/3"
    />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="signUp"
      type="secondary"
      size="md"
      @click.prevent="signUp"
    />
    <AwesomeButton
      class="capitalize w-full md:w-auto"
      text="healthCheck"
      type="secondary"
      size="md"
      @click.prevent="healthCheck"
    />
  </form>

  <LayoutPageWrapper>
    <LayoutPageHeader>
      <LayoutPageTitle text="Posts" class="capitalize" />
    </LayoutPageHeader>
    <LayoutPageSection>
      <ContentList path="/post">
        <template #default="{ list }">
          <div
            v-for="article in list"
            :key="article._path"
            class="hover:no-underline p-6 flex space-x-6 rounded border border-gray-900/10 dark:border-gray-50/[0.2] mb-4"
          >
            <div class="mt-1 text-gray-600 dark:text-gray-400 text-right">
              <div>{{ article.date }}</div>
              <AwesomeLink
                class="text-sm flex items-center justify-end space-x-1"
                :href="`https://www.github.com/${article.author}`"
              >
                <Icon name="mdi:github-face" class="text-xs" />
                <span>{{ article.author }}</span>
              </AwesomeLink>
            </div>
            <div class="flex flex-col">
              <div
                class="text-xl font-semibold text-gray-800 dark:text-gray-50"
              >
                {{ article.title }}
              </div>
              <div class="text-gray-700 dark:text-gray-300 mb-1">
                {{ article.description }}
              </div>
              <div class="flex">
                <AwesomeLink
                  class="text-sm flex space-x-1 items-center text-primary-500"
                  :to="article._path"
                >
                  <span>learn more</span>
                  <Icon name="ic:baseline-arrow-right-alt" class="text-sm" />
                </AwesomeLink>
              </div>
            </div>
          </div>
        </template>
        <template #not-found>
          <p>No articles found.</p>
        </template>
      </ContentList>
    </LayoutPageSection>
  </LayoutPageWrapper>

  <!-- <button @click="login" style="background-color: green">로그인</button> -->
</template>

<style></style>
