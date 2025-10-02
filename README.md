# My Blog

Next.js 기반의 정적 블로그입니다. 마크다운으로 글을 작성하고, 카테고리와 태그로 관리할 수 있습니다.

## 주요 기능

- ✍️ **마크다운으로 글 작성** - 간편한 마크다운 문법으로 글 작성
- 📁 **카테고리별 폴더 관리** - 체계적인 콘텐츠 구조
- 🏷️ **태그 기반 분류** - 다중 태그로 글 분류 및 필터링
- 📅 **자동 날짜 추출** - 파일명에서 날짜 자동 파싱
- 🎨 **아름다운 디자인** - Shadcn UI의 Tangerine 테마 적용
- 📖 **최적화된 읽기 경험** - 깔끔한 타이포그래피와 마크다운 스타일링
- 🚀 **Vercel 배포 최적화** - 정적 생성으로 빠른 로딩
- 🌓 **다크 모드 지원** - 자동 테마 전환

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

## 글 작성 방법

### 파일 구조

글은 `posts` 디렉토리 내 카테고리별 폴더에 저장합니다:

```
posts/
├── dev/          # 개발 관련 글
├── tech/         # 기술 관련 글
└── life/         # 일상 관련 글
```

### 파일명 형식

파일명은 다음 형식을 따라야 합니다:

```
YYYY-MM-DD-제목.md
```

예시:
- `2025-10-01-Next.js로-블로그-만들기.md`
- `2025-09-28-TypeScript-고급-타입.md`

날짜는 자동으로 파싱되어 글의 작성일로 사용됩니다.

### 마크다운 형식

각 마크다운 파일은 다음과 같은 형식으로 작성합니다:

```markdown
---
title: 글 제목
tags: [태그1, 태그2, 태그3]
excerpt: 글 요약 (선택사항)
---

# 글 제목

본문 내용...
```

#### Frontmatter 필드

- `title`: 글 제목 (필수)
- `tags`: 태그 배열 (선택)
- `excerpt`: 글 요약 (선택, 없으면 자동 생성)
- `date`: 작성일 (선택, 파일명에서 자동 추출)

## 프로젝트 구조

```
myblog-cursor/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 페이지 (글 목록)
│   ├── posts/[category]/[slug]/  # 글 상세 페이지
│   ├── category/[category]/       # 카테고리 페이지
│   ├── tag/[tag]/                 # 태그 페이지
│   └── layout.tsx                 # 루트 레이아웃
├── lib/
│   ├── posts.ts           # 마크다운 파싱 유틸리티
│   └── utils.ts           # 공통 유틸리티
├── posts/                 # 마크다운 글 저장소
│   ├── dev/
│   ├── tech/
│   └── life/
└── components.json        # Shadcn UI 설정
```

## 배포

### Vercel에 배포하기

1. GitHub 저장소에 코드를 푸시합니다
2. [Vercel](https://vercel.com)에 로그인합니다
3. 새 프로젝트를 생성하고 GitHub 저장소를 선택합니다
4. 빌드 설정은 자동으로 감지됩니다
5. 배포 버튼을 클릭합니다

자동으로 HTTPS, CDN, 지속적 배포가 설정됩니다.

## 기술 스택

- **프레임워크**: Next.js 15 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: Shadcn UI (Tangerine 테마)
- **마크다운 파싱**: gray-matter, remark, rehype
- **날짜 처리**: date-fns
- **배포**: Vercel

## 라이선스

MIT
