---
title: redux에 typescript 적용하기
date: '2023-07-19'
tags: ['typescript', 'redux']
draft: false
summary: redux toolkit을 typescript 사용하기위해 setup하는 방법
---

# 1. RootState와 Dispatch 타입 정의

```javascript
import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    item: itemReducer,
    content: contentReducer,
  },
})

// `RootState`와 `AppDispatch` 타입을 store로부터 추출
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

# 2. 타입이 정의된 훅 만들기

`useSelector`의 경우에 모든 컴포넌트들에서 사용할시 `(state: RootState)` 를 타이핑해야 된다. <br/>
또한 `useDispatch` 훅 자체로는 thunk나 미들웨어를 알지 못하기때문에 pre-typed 된 새로운 훅을 만들면 용이하다.

```javascript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 앱내에서 useDispatch나 useSelector 훅 대신 useAppDispatch나 useAppSelector 훅을 사용하면 된다.
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

예시
```javascript
export default function SideBar({ type, contentId }) {
  // ...
  const dispatch = useAppDispatch()
  const { isAdded, items } = useAppSelector((state) => state.item)
  // ...
}
```
