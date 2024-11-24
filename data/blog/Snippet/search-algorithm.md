---
title: Searching Algorithm (검색 알고리즘)
date: '2023-08-07'
tags: ['snippet', 'code', 'algorithm']
draft: false
summary: linear search, binary search, naive search
---

# 1. 선형 검색

배열안에서 순서대로 원하는 값을 찾음.

javascript에서 `indexOf`, `includes`, `find`, `findIndex` 같은 메소드들이 linear search로 동작함.

```javascript
function linearSearch(arr, num) {
  // add whatever parameters you deem necessary - good luck!
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) return i
  }
  return -1
}
```

# 2. 이진 검색

이진 검색의 기본적인 개념은 분할 정복(Dividing and Conquering)이다. 즉, 예를들어 한 배열 안에서 특정 요소를 찾으려고 할때, 배열 배열안에서 중간점을 선택하여 중간점을 기준으로 좌우측 중 어디쪽에 있는지 확인한다.

## 이진 검색 의사코드(Pseudo code)

- 정렬된 입력과 값을 받는 함수이다.
- 배열의 시작점에 좌측 포인터, 끝점에 우측 포인터를 만듦.
- 좌측 포인터가 우측 포인터 이전에 있을 동안:
  - 중간에 포인터 생성
  - 값을 찾으면 index 반환
  - 값이 작으면 좌측 포인터를 중간 index로 올림
  - 값이 크면 우측 포인터를 중간 index로 내림
- 배열안에 찾는 값이 없다면 -1 반환

## 코드로 구현

1. 반복문 이용

```javascript
function binarySearch(arr, num) {
  let start = 0
  let end = arr.length - 1
  let mid = Math.floor((start + end) / 2)

  while (arr[mid] !== num && start <= end) {
    if (num < arr[mid]) {
      end = mid - 1
    } else {
      start = mid + 1
    }
    mid = Math.floor(start + end / 2)
  }
  // 값을 찾으면 mid 반환, 없다면 -1 반환
  if (arr[mid] === num) return mid
  return -1
}
```

<br/>

2. 재귀함수 이용

```javascript
function BSearchRecursive(arr, num) {
  let helper = function (start, end) {
    // Base Condition
    if (start > end) return -1

    let mid = Math.floor((start + end) / 2)

    if (arr[mid] === num) return mid
    // mid 원소가 num보다 클때,
    // 좌측에서 search
    if (arr[mid] > num) return helper(start, mid - 1)
    // mid원소가 num보다 작을때,
    // 우측에서 search
    else return helper(mid + 1, end)
  }
  // helper의 결과값 반환
  return helper(0, arr.length - 1)
}
```

## Big'O

| 평균           | Best         |
| -------------- | --------------|
| O(log n)      | O(1)         |

- n - 배열의 길이
- k - 숫자들의 자리수


# 나이브 문자열 검색 (Naive String Search)

- 긴 문자열안에서 외부 루핑
- 짧은 문자열로 내부 루핑(중첩 루프)
- 문자가 일치하지 않으면 내부 루프에서 벗어남.
- 내부 루프를 완료하고 일치하는 문자열을 찾으면 문자열의 길이를 증가시키고 마지막에 그 길이를 반환.

## 코드로 구현

```javascript
function naiveSearch(long, short) {
    let count = 0;
    // 외부루프
    for (let i=0; i<long.length; i++) {
        // 내부루프
        for (let j=0; j<short.length; j++) {
            if (short[j] !== long[i+j]) break;
            if (j === short.length-1) count++;
        }
    }
    return count;
}
```