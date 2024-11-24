---
title: date 타입 에러 핸들링
date: '2023-07-18'
tags: ['typescript', 'error']
draft: false
summary: date diff 계산 타입 에러 핸들링
---

javascript 기반 프로젝트를 typescript로 리팩토링하는 과정에서 다음과 같은 타입 에러가 났다.

```
The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.ts(2362)
```

![code](https://github.com/wontae99/wontae99-blog/assets/109476712/610e7640-739a-49c4-8527-bbbc4021328c)

구글링한 결과 스택 오버플로우에 동일한 케이스를 찾을 수 있었다. [링크](https://stackoverflow.com/questions/36560806/the-left-hand-side-of-an-arithmetic-operation-must-be-of-type-any-number-or)

이유인 즉슨, 우측 사이드 Date의 `-` 연산은 암묵적으로 각 Date 객체의 `value`를 계산하여 `number` 타입으로 반환하므로 다음과 같이 고쳐야 된다.

```javascript
let timeDiff: number;
let writtenTime = new Date(comment.date);

timeDiff = Math.floor((currentTime.valueOf() - writtenTime.valueOf()) / 1000) // 단위: 초(second)
```
