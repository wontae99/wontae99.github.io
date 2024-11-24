---
title: Sorting Algorithm (정렬 알고리즘)
date: '2023-08-11'
tags: ['snippet', 'code', 'algorithm']
draft: false
summary: bubble sort, selection sort, insertion sort
---

# javascript에서의 sort

자바스크립트 내장 `sort` 메소드는 `선택적 비교 함수`를 인자로 전달받는다. 이 비교 함수는 a, b라는 두가지 요소를 비교(a-b)하여 반환 하는 값에 따라 정렬을 한다.

# 버블 정렬(Bubble Sort)

- 서로 인접한 두 원소를 검사하여 정렬하는 알고리즘
- 인접한 2개의 레코드를 비교하여 크기가 순서대로 되어 있지 않으면 서로 교환한다.

![bubble-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/1f7d5a57-7488-422b-9c51-9564ce910062)

## 버블 정렬 의사코드

- 변수 `i`를 가지고 배열 전체 외부 루핑
- 또 다른 변수 `j`를 포함한 내부 루프를 처음부터 `i-1`까지 시행.
- `arr[j]`값이 `arr[j+1]`값 보다 크다면 서로 위치를 바꿈.
- 마지막으로 정렬된 배열 반환.

## 코드 구현

- 의사코드로 구현한 코드

```javascript
function bubbleSort(arr) {
  // 외부 루프
  // 내부 루프에서 i값을 사용하기위해 i값을 배열의 끝지점에서 내림차순으로 루핑함
  for (let i = arr.length; i > 0; i--) {
    // 내부 루프
    for (let j = 0; j < i - 1; j++) {
      // arr[j+1]보다 arr[j]값이 크면 자리 바꿈
      if (arr[j] > arr[j + 1]) {
        // temp 변수를 만들어서 값 저장
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
```

- 변수를 추가하여 최적화한 코드

```javascript
function bubbleSort(arr) {
  let noSwaps
  // swap 헬퍼 함수
  const swap = (arr, idx1, idx2) => {
    ;[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
  }

  for (let i = arr.length; i > 0; i--) {
    // noSwap이라는 변수를 설정함
    noSwaps = true
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        noSwaps = false
      }
    }
    // noSwap이 true일때 불필요한 루프를 줄이기위해 break
    if (noSwaps) break
  }
  return arr
}
```

## 버블 정렬 빅오 복잡도

| 평균   | nearly sorted |
| ------ | ------------- |
| O(n^2) | O(n)          |

빅오 복잡도를 보면 거의 정렬된 상태의 배열을 정렬할때는 버블 정렬이 효과 적일 수 있지만 <br/>
평균적으론, 구현이 쉽고 용이하다는 장점에 비해 런타임이 비효율적이다.

<br/>

# 선택 정렬(Selection Sort)

- 버블 정렬과 비슷하지만, 큰 값을 배열 끝에 위치시키는 대신 작은 값을 한 번에 하나씩 위치에 배열함.
- 제자리 정렬(in-place sorting) 알고리즘의 하나
  - 입력 배열(정렬되지 않은 값들) 이외에 다른 추가 메모리를 요구하지 않는 정렬 방법
- 해당 순서에 원소를 넣을 위치는 이미 정해져 있고, 어떤 원소를 넣을지 선택하는 알고리즘

![selection-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/09e8d738-6777-46fb-b2ce-d4d3bac0a067)

## 선택 정렬 의사코드

- 최솟값을 저장할 변수를 만듦.
- 다음 항목들과 비교하여 더 작은 값을 찾아 그 인덱스를 저장.
- 더 작은 값을 찾으면, 작은 값을 새 최솟값으로 지정.
- 만약 최솟값이 처음 시작한 최솟값(또는 index)와 다르다면 두 값을 바꿈.

## 코드 구현

```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 최솟값 인덱스를 저장하는 변수 설정
    let lowest = i
    for (let j = i + 1; j < arr.length; j++) {
      // 최솟값 발견시 해당 인덱스 저장
      if (arr[j] < arr[lowest]) lowest = j
    }
    let temp = arr[i]
    arr[i] = arr[lowest]
    arr[lowest] = temp
  }
  return arr
}
```

## 선택 정렬 시간 복잡도

| 평균   |
| ------ |
| O(n^2) |

<br/>

# 삽입 정렬

- 자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열 부분과 비교 하여, 자신의 위치를 찾아 삽입함으로써 정렬을 완성하는 알고리즘
- 매 순서마다 해당 원소를 삽입할 수 있는 위치를 찾아 해당 위치에 넣는다.

![insertion-sort](https://github.com/wontae99/woncha-typescript/assets/109476712/99ea04b5-0091-42da-8bd5-d6b95cdfc984)

## 삽입 정렬 의사코드

- 배열의 두 번째 요소를 선택하여 시작
- 선택된 요소의 이전 요소와 비교하여 필요시 자리 바꿈
- 다음 요소로 이어서 비교하여 틀린 순서에 위치해 있다면 정렬된 부분(좌측 부분)에서 루핑하여 맞는 자리를 찾음.
- 배열이 정렬될 때까지 반복.

## 코드 구현

```javascript
function insertionSort(arr) {
    // 두 번째 요소부터 루핑 시작
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i]
    for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = currentVal
  }
  return arr
}
```

## 삽입 정렬 시간 복잡도

| 평균   | nearly sorted |
| ------ | ------------- |
| O(n^2) | O(n)          |

삽입 정렬은 거의 정렬이 완료된 배열에서 행해지면 효율적이다. 예를 들면, 실시간으로 들어오는 데이터들을 정렬할 경우가 있다.
<br/>

# 버블 정렬, 선택 정렬, 삽입 정렬 비교

버블 정렬, 선택 정렬, 삽입 정렬은 시간 복잡도가 O(n<sup>2</sup>)이기 때문에 `2차 정렬 알고리즘`이라고 부르기도 한다.
구현이 비교적 단순하지만 큰 데이터 셋에서 비효율적이라는 단점이 있다.

| 알고리즘   | 시간 복잡도(Best) | 시간 복잡도(평균)  | 시간 복잡도(Worst) | 공간 복잡도 |
| ------ | ------------- |------ | ----- | ------ |
| 버블 정렬 | O(n) | O(n<sup>2</sup>)  |  O(n<sup>2</sup>)    |  O(1)  |
| 삽입 정렬 | O(n) | O(n<sup>2</sup>) | O(n<sup>2</sup>) |O(1) |
| 선택 정렬 |O(n<sup>2</sup>) |O(n<sup>2</sup>) |O(n<sup>2</sup>) | O(1) | 