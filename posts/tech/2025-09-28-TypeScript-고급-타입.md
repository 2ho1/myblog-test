---
title: TypeScript 고급 타입 알아보기
tags: [TypeScript, JavaScript, Programming]
excerpt: TypeScript의 고급 타입 기능들을 살펴보고 실전에서 활용하는 방법을 알아봅니다.
---

# TypeScript 고급 타입

TypeScript는 강력한 타입 시스템을 제공합니다. 고급 타입 기능들을 잘 활용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다.

## Union Types

여러 타입 중 하나가 될 수 있는 값을 표현합니다:

```typescript
type Status = 'pending' | 'success' | 'error';

function handleStatus(status: Status) {
  // ...
}
```

## Intersection Types

여러 타입을 결합합니다:

```typescript
type Person = {
  name: string;
};

type Employee = {
  id: number;
};

type Staff = Person & Employee;
```

## Utility Types

TypeScript는 유용한 유틸리티 타입들을 제공합니다:

- `Partial<T>`: 모든 속성을 optional로 만듭니다
- `Required<T>`: 모든 속성을 필수로 만듭니다
- `Pick<T, K>`: 특정 속성만 선택합니다
- `Omit<T, K>`: 특정 속성을 제외합니다

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserWithoutEmail = Omit<User, 'email'>;
```

## Generic Types

재사용 가능한 컴포넌트를 만들 때 유용합니다:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>('hello');
```

## 마치며

TypeScript의 타입 시스템을 잘 활용하면 런타임 에러를 줄이고 개발 생산성을 높일 수 있습니다.


