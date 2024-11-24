---
title: 해시 테이블
date: '2023-08-18'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: 해시, 해시 테이블 정의, 구현
---

# 목표

- 해시 테이블에 대해 알아본다
- 해시 알고리즘이 무엇인지 정의한다
- 무엇이 좋은 해시 알고리즘을 만드는지 알아본다
- 해시 테이블에서 충돌이 일어나는 경우와 충돌이 무슨 의미인지 알아본다
- 충돌을 해결하는 두 가지 방법을 알아본다:
  - 개별 체이닝(Seperate Chaining)
  - 선형 탐색(Linear Probing)

# 해시 테이블

해시 테이블은 key-value 쌍을 테이블에 저장할때, key값을 함수를 이용해 계산을 수행한 후, 그 결과값을 배열의 인덱스로 사용하여 저장하는 방식이다.

배열과 비슷한듯 하지만 배열은 수리학적으로 제한되어 있는 반면 해시 테이블은 그렇지 않다. 또한 해시 테이블의 키는 순서를 가지지 않는다.

해시 테이블의 장점은 값을 찾거나, 새로운 값을 추가하거나, 값을 제거하는데 매우 빠르다는 것이다.

이러한 특징때문에, 거의 모든 언어들이 해시 테이블 종류의 구조를 가지고 있다. 예를 들면, Python은 딕셔너리를, JS는 객체를, Java, Go, Scala는 맵을 가지고 있다.

# 해시 함수

해시 함수(hash function)는 임의의 길이를 가진 데이터를 입력받아 고정된 길이의 값, 즉 해시값을 출력하는 단방향 함수이다.

## 좋은 해시 함수의 조건

1. 속도 - 함수의 속도가 빨라야 한다.
2. 기본적으로 일관된 방식으로 분배를 해서 다른 것들과 겹치지 않게 해야 한다. 이때 겹쳐지게 되는 현상을 충돌(Collision)이라고 한다.
3. 결정적(Deterministic)이어야 한다 - 특정 입력값을 입력할 때마다 같은 출력값이 나와야 한다.

## 충돌(Collision) 처리

1. 개별 체이닝(Seperate Chaining)

개별 체이닝은 기본적으로 같은 장소에 여러 데이터를 저장할 때, 배열이나 연결 리스트 등과 같은 것을 활용하여 이중 데이터 구조를 쓰는 것이다.

2. 선형 탐색(Linear Probing)

선형 탐색은 각 위치에 하나의 데이터만 저장한다는 규칙을 그대로 살려서 지키려고 한다. 때문에 충돌이 일단 발생하면 다음 빈 칸이 어디인지 확인한다.

# 해시 테이블 구현하기

- HashTable 클래스
  - size를 인자로 받아 해시 테이블의 크기 결정 (default값으로 53설정)

```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size)
  }
}
```

- hash 메소드
  - 소수와 모듈러 연산을 사용하여 가능한 충돌이 일어나지 않도록 함 (실제 해시 함수에서도 소수를 많이 사용)

```javascript
hash(key) {
  let total = 0;
  let prime = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    total = (total * prime + value) % this.keyMap.length;
  }
  return total;
}
```

- set 메소드
  - key, value를 인자로 받음
  - key를 해시하여 어디에 저장할지 알아냄
  - 개별 체이닝을 통해 해시 테이블 배열에 key-value 쌍을 저장

```javascript
set(key, val) {
  let index = this.hash(key);
  if (!this.keyMap[index]) {
    this.keyMap[index] = [];
  }
  this.keyMap[index].push([key, val]);
}
```

- get 메소드
  - 키를 인자로 받음
  - 키를 해시처리하여 keyMap 인덱스 자리 확인
  - 해시 테이블에서 key-value 쌍을 확인

```javascript
get(key) {
  let index = this.hash(key);
  if (this.keyMap[index]) {
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        return this.keyMap[index][i][1];
      }
    }
  }
  return undefined;
}
```

- keys 메소드
  - 해시 테이블 배열을 루핑하여 테이블에 저장된 모든 key를 한 배열에 모아 반환

```javascript
keys() {
  let pairs = [];
  let keys = [];
  for (let pair of this.keyMap) {
    if (pair) pairs.push(...pair);
  }
  for (let pair of pairs) {
    // 겹치는 key값이 없도록 반환될 배열에 넣음
    if (!keys.includes(pair[0])) {
      keys.push(pair[0]);
    }
  }
  return keys;
}
```

- values 메소드
  - 해시 테이블 배열을 루핑하여 테이블에 저장된 모든 value를 한 배열에 모아 반환

```javascript
values() {
  let pairs = [];
  let values = [];
  for (let pair of this.keyMap) {
    if (pair) pairs.push(...pair);
  }
  for (let pair of pairs) {
    if (!values.includes(pair[1])) {
      values.push(pair[1]);
    }
  }
  return values;
}
```

# 해시 테이블의 빅오

일반적인 해시 테이블에서는 데이터의 삽입/삭제/접근이 아주 삐른 상수값을 가진다.

- Insertion - O(1)
- Deletion - O(1)
- Access - O(1)

