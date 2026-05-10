# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 소개

- 음식배달 앱
- FO, BO가 통합되어 있음
- 기술: nuxt3, typescript

## Commands

```bash
# 로컬 개발 서버 실행 (host 0.0.0.0, port 3000, .env.loc 사용)
pnpm dev

# 개발 환경 빌드 (.env.dev 사용)
pnpm build:dev

# 프로덕션 빌드
pnpm build

# 린트 검사
pnpm lint

# 린트 자동 수정
pnpm lint:fix
```

환경 파일: `.env.loc` (로컬), `.env.dev` (개발 서버)  
환경 변수: `API_SERVER_URL` (클라이언트 API), `SSR_SERVER_URL` (SSR 전용 API)

## 아키텍처

### 레이어 구조

이 프로젝트는 **Nuxt Layer** 구조를 사용합니다.

- **루트 (`/`)** — 공통 레이어. 컴포넌트, 컴포저블, 레이아웃, 스토어, 타입 등 공유 자원 포함
- **`/app`** — 실제 비즈니스 앱. `nuxt.config.ts`에서 `extends: '../'`로 루트 레이어를 상속

빌드/실행 명령어는 모두 `./app` 디렉토리를 대상으로 실행됩니다 (`nuxt dev ./app`).

### 컴포넌트 prefix 규칙 (`nuxt.config.ts`)

| prefix    | 경로                  | 설명                                |
| --------- | --------------------- | ----------------------------------- |
| (없음)    | `components/`         | 일반 컴포넌트 (로컬 등록)           |
| `Layout`  | `components/layouts/` | 레이아웃용 공통 컴포넌트, 전역 등록 |
| `Awesome` | `components/awesome/` | 스타터 기본 컴포넌트, 전역 등록     |
| `Bo`      | `components/bo/`      | 백오피스 전용 컴포넌트, 전역 등록   |

예: `components/bo/item/ScreenHeader.vue` → `<BoItemScreenHeader>`

### 관리자(Admin) 화면 구조

- 레이아웃: `layouts/admin.vue` — 사이드바 + 탭 기반 멀티 패널 UI
- 사이드바 메뉴(`menus`)는 `layouts/admin.vue`에 정적으로 정의되어 있음
- 탭을 열 때 `route` 필드에 `defineAsyncComponent`로 페이지 컴포넌트를 동적 로딩
- 실제 페이지: `app/pages/admin/` 하위 (system, store, member 등)

### API 호출 패턴

`composables/use-custom-fetch.ts`에서 두 가지 방식을 제공합니다.

- **`customFetch<T>(url, opts)`** — 이벤트 핸들러(버튼 클릭 등)에서 사용. 내부적으로 `$fetch` 래핑
- **`customUseFetch(url, opts)`** — SSR/초기 렌더링 데이터 조회에 사용. `useFetch` 래핑

두 방식 모두 공통으로:

- SSR일 때 `ssrBase`, 클라이언트일 때 `apiBase`를 baseURL로 사용
- `Authorization: Bearer {accessToken}` 헤더 자동 주입
- 401 응답 시 토큰 갱신 후 재시도 처리
- 글로벌 타입 `ApiResponse<T>` (`types/api.d.ts`)로 응답 구조 통일: `{ code, message, data }`

### 상태 관리 (Pinia)

- 루트 `stores/` — 공통 스토어 (예: `use-example.ts`)
- `app/stores/` — 앱 전용 스토어
  - `useUserStore` — 로그인/로그아웃/토큰 갱신/인증 상태 관리

### 백오피스 공통 컴포넌트 (`components/bo/`)

- `BoItemScreenHeader` — 화면 상단 타이틀 + 조회/등록 버튼 (props: `showSearch`, `showRegister`, events: `@search`, `@register`)
- `BoItemAgGrid` — AG Grid 래퍼. `<ClientOnly>` 로 SSR 비활성화, `$attrs`로 모든 ag-grid props 전달
- `BoItemLayerPopup` — 레이어 팝업
- `BoItemSearchButton` — 검색 버튼
- `BoLayoutSideBar` — 어드민 사이드바

### 아이콘

`nuxt-icon` 모듈 사용. `<Icon name="mdi:..." />` 형태로 사용 (Material Design Icons 등).

## 디자인 시스템

UI 작업 시 반드시 `/design.md`를 참조하세요. 색상, 타이포그래피, 컴포넌트 스타일, 레이아웃 간격 등 디자인 가이드라인이 정의되어 있습니다.
