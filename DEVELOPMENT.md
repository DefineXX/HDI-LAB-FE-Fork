# 개발 환경 설정 가이드

## 🚀 자동화된 개발 워크플로우

이 프로젝트는 UI 패키지와 스타일 패키지의 변경사항을 자동으로 감지하고 빌드한 후 개발 서버를 실행하는 워크플로우가 구축되어 있습니다.

## 📋 사용 가능한 스크립트

### 기본 개발 명령어

```bash
# 모든 앱 개발 서버 실행 (UI 패키지 먼저 빌드)
pnpm run dev

# 특정 앱만 개발 서버 실행 (UI 패키지 먼저 빌드)
pnpm run dev:web
pnpm run dev:docs
pnpm run dev:admin
```

### 🎯 권장 개발 명령어 (UI 패키지 watch 모드 포함)

```bash
# 웹 앱 + UI 패키지 watch 모드
pnpm run dev:web:full

# 문서 앱 + UI 패키지 watch 모드
pnpm run dev:docs:full

# 관리자 앱 + UI 패키지 watch 모드
pnpm run dev:admin:full
```

## 🔄 워크플로우 동작 방식

### 1. 기본 개발 모드 (`pnpm run dev:*`)

- UI 패키지를 먼저 빌드 (`build:styles` + `build:components`)
- 빌드 완료 후 앱의 개발 서버 실행
- UI 패키지 변경 시 수동으로 다시 빌드 필요

### 2. 전체 개발 모드 (`pnpm run dev:*:full`) ⭐ **권장**

- UI 패키지의 스타일과 컴포넌트를 watch 모드로 실행
- 동시에 앱의 개발 서버 실행
- UI 패키지 변경사항이 실시간으로 반영됨

## 🛠️ UI 패키지 개발

UI 패키지에서 작업할 때:

```bash
# UI 패키지만 watch 모드로 실행
cd packages/ui
pnpm run dev

# 또는 루트에서
pnpm --filter @hdi/ui run dev
```

## 📦 빌드 명령어

```bash
# 모든 패키지 빌드
pnpm run build

# UI 패키지만 빌드
pnpm --filter @hdi/ui run build
```

## 🎨 스타일 개발

Tailwind CSS 스타일이 `packages/ui/src/styles.css`에 정의되어 있습니다.

- 스타일 변경 시 자동으로 `dist/index.css`로 컴파일됩니다
- 각 앱에서 `@hdi/ui/styles.css`를 import하여 사용합니다

## 🔧 문제 해결

### UI 패키지 모듈을 찾을 수 없는 경우

```bash
# UI 패키지 빌드
pnpm --filter @hdi/ui run build

# 또는 전체 빌드
pnpm run build
```

### 개발 서버가 제대로 시작되지 않는 경우

```bash
# 의존성 재설치
pnpm install

# 캐시 정리 후 빌드
pnpm run build
```

## 📁 프로젝트 구조

```bash
packages/
├── ui/                 # 공통 UI 컴포넌트
│   ├── src/
│   │   ├── card.tsx    # Card 컴포넌트
│   │   ├── gradient.tsx # Gradient 컴포넌트
│   │   └── styles.css  # Tailwind CSS 스타일
│   └── dist/           # 빌드된 파일들
├── eslint-config/      # ESLint 설정
├── tailwind-config/    # Tailwind 설정
└── typescript-config/  # TypeScript 설정

apps/
├── web/               # 웹 애플리케이션
├── docs/              # 문서 사이트
└── admin/             # 관리자 패널
```

## 💡 개발 팁

1. **UI 컴포넌트 개발**: `packages/ui/src/`에서 컴포넌트를 수정하면 자동으로 빌드됩니다
2. **스타일 수정**: `packages/ui/src/styles.css`를 수정하면 실시간으로 반영됩니다
3. **타입 체크**: `pnpm run check-types`로 전체 프로젝트 타입을 확인할 수 있습니다
4. **린팅**: `pnpm run lint`로 코드 스타일을 확인할 수 있습니다
