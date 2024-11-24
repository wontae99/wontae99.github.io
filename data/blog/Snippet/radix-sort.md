---
title: Radix Sort(기수 정렬)
date: '2023-08-06'
tags: ['snippet', 'code', 'algorithm']
draft: false
summary: radix sort
---

# Snippet 설명

1. 첫번째 헬퍼 함수 - 숫자 `num`와 자리수를 그 숫자의 자리수를 나타내는 `i`를 인풋으로 받아 오른쪽에서부터 i번째 자리를 반환하는 `getDigit` 함수 작성

2. 두번째 헬퍼 함수 - 숫자 `num`을 인풋으로 받아 그 숫자의 자리 수를 반환하는 `digitCount` 함수 작성

3. 세번째 헬퍼 함수 - 숫자 배열 `nums`를 인풋으로 받아 그 중 가장 큰 수를 반환하는 함수 `mostDigit` 작성

4. `radixSort` - 숫자 배열을 인풋으로 받아서 오름차순으로 정렬시키는 `radixSort` 함수 작성

# Code

1. `getDigit` 함수

10의 `i` 제곱을 `num`으로 나눠 1의 자리수를 반환 하도록 하였음

```javascript
function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10
}
```

2. `digitCount` 함수

로그함수를 이용하여 자리수 구하는 방법

```javascript
function digitCount(num) {
  if (num === 0) return 1
  return Math.floor(Math.log10(Math.abs(num))) + 1
}
```

또는 숫자를 배열로 만들어 그 배열의 length를 반환하는 방법도 있다.

```javascript
function digitCount(num) {
  let numArray = num.toString().split('')
  return numArray.length
}
```

3. `mostDigit` 함수

`for`문으로 매 루프마다 최댓값을 갱신하여 루프가 끝난 후 반환

```javascript
function mostDigit(nums) {
  let maxDigit = 0
  for (let i = 0; i < nums.length; i++) {
    maxDigit = Math.max(maxDigit, digitCount(nums[i]))
  }
  return maxDigit
}
```

4. `radixSort` 함수

```javascript
function radixSort(arr) {
  let maxDigitCount = mostDigit(arr)
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => [])
    /// 길이가 10인 []를 원소로 갖는 배열 생성

    for (let i = 0; i < arr.length; i++) {
      let digit = getDigit(arr[i], k)
      digitBuckets[digit].push(arr[i])
    }
    // 1의 자리 부터 가장 큰 자리 수까지 배열 정렬
    arr = [].concat(...digitBuckets)
  }
  return arr
}
```

# Big'O

| 시간 복잡도            | 공간 복잡도         |
| --------------------- | --------------------|
| O(nk)                 | O(n + k)               |

- n - 배열의 길이
- k - 숫자들의 자리수