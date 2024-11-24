---
title: Sorting Algorithm - 합병, 퀵, 기수 정렬
date: '2023-08-12'
tags: ['snippet', 'code', 'algorithm']
draft: false
summary: sorting algorithm - merge sort, quick sort, radix sort
---

# 합병 정렬(Merge Sort)

- 기본적으로 분할 정복(Divide & Conquer) 알고리즘 중 하나.
- 리스트의 길이가 0 또는 1이면 이미 정렬된 것으로 본다.
  - 배열을 0이나 1 요소 배열이 될 때까지 계속하여 나눔.

![merge-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/df5be5f1-9a48-4fb7-bcaa-fb0962109d1d)

![merge-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/128a63be-8593-4cd3-aa51-06c174a0a561)

## 합병 정렬 의사코드

- 두 개의 나눠진 배열의 합병을 시행하는 헬퍼 함수를 먼저 구현하는 것이 용이.
- 헬퍼 함수는 주어진 정렬된 두 배열로 정렬된 새 배열을 만듦.
- `O(n+m)` 시간과 `O(n+m)`공간으로 실행될 것. (n: 첫 번째 배열의 크기, m: 두 번째 배열의 크기)

## 코드 구현

```javascript
// 입력 두개를 취하는 헬퍼 함수를 정의
function merge(arr1, arr2) {
  // 마지막에 반환할 빈 배열을 만듦.
  let results = []
  let i = 0
  let j = 0
  while (i < arr1.length && j < arr2.length) {
    // 두 배열을 동시에 루핑
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i])
      i++
    } else {
      results.push(arr2[j])
      j++
    }
  }
  //각 배열에 남은 요소들을 결과값에 추가
  while (i < arr1.length) {
    results.push(arr1[i])
    i++
  }
  while (j < arr2.length) {
    results.push(arr2[j])
    j++
  }

  return results
}

// 재귀함수를 이용하여 구현함
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  let mid = Math.floor(arr.length / 2)
  let left = mergeSort(arr.slice(0, mid))
  let right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
```

## 합병 정렬 빅오 복잡도

n (배열끼리 n번 비교됨) x 2<sup>n</sup> (배열의 길이에 따라 분리하는 횟수) 으로 시간 복잡도가 계산될 수 있다.

| 시간 복잡도 | 공간 복잡도 |
| ----------- | ----------- |
| O(n log n)  | O(n)        |

<br/>

# 퀵 정렬(Quick Sort)

- 분할 정복(divide & conquer) 알고리즘의 하나로, 평균적으로 매우 빠른 수행 속도를 자랑하는 정렬 방법

  - 합병 정렬(merge sort)과 달리 퀵 정렬은 리스트를 비균등하게 분할

- 합병 정렬과 비슷하게, 배열에 0개 또는 1개의 요소가 남을때까지 분할하여 개별적으로 정렬되는 방식

- 하나의 리스트를 피벗(pivot)을 기준으로 두 개의 비균등한 크기로 분할하고 분할된 부분 리스트를 정렬한 다음, 두 개의 정렬된 부분 리스트를 합하여 전체가 정렬된 리스트가 되게 하는 방법이다.

![quick-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/286c1f9a-71d3-4f9c-9ae1-2116fa4d6888)

![quick-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/111ee3ca-4923-40d6-92b2-34a65b90949b)

## 의사 코드

- 피봇 헬퍼

  - 배열이 주어지면 한 요소를 pivot으로 지정하여 배열 속 요소를 재배치하는 함수
  - pivot보다 작은 값은 모두 왼쪽으로 이동, 큰 값은 모두 오른쪽으로 이동 (pivot을 기준으로만 정렬)
  - 헬퍼 함수는 제자리에서 수행되어야 하고, 새로운 배열을 만들어내지 않음
  - 마지막으로 pivot의 인덱스를 반환
  - 편의상 맨 첫 부분을 pivot으로 지정


- quickSort 
  - 업데이트된 pivot 인덱스를 헬퍼가 반환하면 피벗 헬퍼를 재귀적으로 왼쪽과 오른쪽에 호출

## 코드 구현

```javascript
// 한 개의 배열과 시작 인덱스(default: 0), 끝 인덱스(default: 배열 길이 - 1) 를 인수로 받는 헬퍼 함수
function pivot(arr, start = 0, end = arr.length - 1) {
  // 배열 내 인덱스 i와 j 위치를 바꾸는 swap 함수
  function swap(array, i, j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  // 배열의 시작점을 pivot으로 설정
  let pivot = arr[start]
  let swapIdx = start

  for (let i = start + 1; i < arr.length; i++) {
    // pivot이 요소보다 크면 swapIdx값 증가 후 서로 위치를 바꿈
    if (pivot > arr[i]) {
      swapIdx++
      swap(arr, swapIdx, i)
    }
  }
  // 시작했던 pivot과 pivot 인덱스를 바꾼 후 pivot 인덱스 반환
  swap(arr, start, swapIdx)
  return swapIdx
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    // pivotIndex 변수에 헬퍼 함수로 반환된 인덱스 값 저장
    let pivotIndex = pivot(arr, left, right) 
    //left
    quickSort(arr, left, pivotIndex - 1)
    //right
    quickSort(arr, pivotIndex + 1, right)
  }
  // 하위 배열의 길이가 0 또는 1일때 반환
  return arr
}
```

## 퀵 정렬 빅오

- 시간 복잡도
  - Best/Average Case
    - ![image](https://github.com/wontae99/woncha-typescript/assets/109476712/9c41b315-ddf2-47ef-8a21-b2268aeac6e3)
    - n(비교 연산) * log n(순환 호출의 깊이)
  - Worst Case 
    - 리스트가 계속 불균형하게 나누어지는 경우 (특히, 이미 정렬된 리스트에 대하여 퀵 정렬을 실행하는 경우)
    - 순환 호출의 깊이(n) * 각 순환 호출 단계의 비교(n) 연산


| Best   | Average | Worst | 
| ------ | ------- | ------|
| O(n log n) | O(n log n)   | O(n<sup>2</sup>)   |


- 공간 복잡도

| 공간 복잡도 |
| ------------- |
| O(log n)          |

<br/>

# 기수 정렬 (Radix Sort)

기수 정렬은 숫자를 직접적으로 비교하지 않고,  낮은 자리수부터 비교하여 정렬해 간다는 것을 기본 개념으로 하는 정렬 알고리즘이다. 기수정렬은 비교 연산을 하지 않으며 정렬 속도가 빠르지만 데이터 전체 크기에 기수 테이블의 크기만한 메모리가 더 필요하다.

[기수 정렬 포스트](https://wontae99.vercel.app/blog/Snippet/radix-sort)