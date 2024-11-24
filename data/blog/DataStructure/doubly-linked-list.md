---
title: Doubly Linked List(이중 연결 리스트)
date: '2023-08-14'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: Doubly linked list 정의 및 코드 구현
---

# 이중 연결 리스트(Doubly Linked List)

이중 연결 리스트는 단일 연결 리스트와 마찬가지로, 배열과 다르게 숫자나 인덱스를 통해 접근할 수 없고 헤드와 테일을 가지고 있다. 다만 단일 연결 리스트와는 다르게, 모든 노드들이 앞으로 가는 포인터 뿐만 아니라 뒤로 가는 포인터를 가지고 있다.

![DLL](https://github.com/wontae99/woncha-typescript/assets/109476712/ab21da9b-fd55-4030-b597-58af44546a42)

이러한 특징덕에 양방향 탐색이 가능하여 데이터 접근에 더 유연하지만 그만큼 더 많은 메모리를 필요로 한다. (일종의 trade-off인셈)

## 코드 구현

- Node 클래스
  - 값을 저장할 속성, `next`, `prev` 속성을 가짐

```javascript
class Node {
  constructor(val) {
    this.val = val
    this.next = null
    this.prev = null
  }
}
```

- `DoublyLinkedList` 클래스
  - 스켈레톤은 단일 연결 리스트에서의 클래스와 동일하게 설정

```javascript
class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
}
```

- `push` 메소드
  - 값을 인자로 받는 새로운 노드를 리스트 맨 뒤에 추가하는 함수
  - 리스트가 비어있다면, 새로운 노드가 헤드이자 테일이 됨
  - 리스트가 비어있지 않다면, 현재 테일을 찾아 테일의 `next` 프로퍼티가 새로운 노드가 되도록 설정
  - 새로 만든 노드의 `prev` 프로퍼티가 이전 테일이 되도록 설정
  - 새로운 노드가 테일이 되도록 설정
  - 마지막으로, 길이를 1 증가 후 리스트 반환

```javascript
push(val) {
  var newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }
  this.length++;
  return this;
}
```

- `pop` 메소드
  - 리스트의 끝 노드를 제거하는 함수
  - 리스트가 비어있다면 `undefined` 반환
  - 리스트 길이가 1일때, `head`와 `tail` 모두 `null`로 설정
  - 제거될 `tail`의 `prev` 노드를 새로운 테일로 업데이트
  - 새로운 테일의 `next` 속성을 `null`로 업데이트
  - 마지막으로 길이를 1 감소시킨 후 제거된 노드 반환

```javascript
pop(val) {
  if (this.length === 0) return undefined;
  var poppedNode = this.tail;
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = poppedNode.prev;
    this.tail.next = null;
    poppedNode.prev = null;
  }
  this.length--;
  return poppedNode;
}
```

- `shift` 메소드
  - 리스트의 시작 노드를 제거하는 함수
  - 리스트가 비어있다면, `undefined` 반환
  - 리스트 길이가 1일때, `head`와 `tail` 모두 `null`로 설정
  - `head`를 제거될 노드의 `next` 노드로 업데이트
  - 새로운 `head`의 `prev` 속성을 `null`로 업데이트
  - 마지막으로 길이를 1 감소시킨 후, 제거된 노드 반환

```javascript
shift() {
  if (this.length === 0) return undefined;
  var oldHead = this.head;
  if (this.length === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = oldHead.next;
    this.head.prev = null;
    oldHead.next = null; // 제거된 노드의 연결을 끊음
  }
  this.length--;
  return oldHead;
}
```

- `unshift` 메소드
  - 리스트의 맨 앞에 노드를 추가하는 함수
  - 리스트가 비어있을 경우, 새로운 노드가 `head`와 `tail`이 되도록 설정
  - 빈 리스트가 아닐 경우
    - 헤드의 `prev` 프로퍼티가 새로운 노드가 되도록 함
    - 새로운 노드의 `next` 프로퍼티가 현재 헤드가 됨
    - 새로운 노드를 `head`로 업데이트
  - 마지막으로 길이를 1 증가시킨 후, 리스트를 반환

```javascript
unshift(val) {
  var newNode = new Node(val);
  if (this.length === 0) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;
  }
  this.length++;
  return this;
}
```

- `get` 메소드
  - 인덱스를 인자로 받아 그 위치에 있는 노드를 출력하는 함수
  - 인덱스가 0보다 작거나 리스트의 길이와 같거나 크다면 `null` 반환
  - 인덱스가 리스트의 길이의 절반보다 작거나 같을때
    - 리스트의 `head`부터 시작해서 중간까지 루핑
  - 인덱스가 리스트의 길이의 절반보다 클때
    - 리스트의 `tail`부터 시작해서 중간까지 루핑
  - 노드를 찾으면 해당 노드 반환

```javascript
get(ind) {
  if (ind < 0 || ind >= this.length) return null;
  var current, count;
  if (ind <= this.length / 2) {
    current = this.head;
    count = 0;
    while (count !== ind) {
      current = current.next;
      count++;
    }
  } else {
    current = this.tail;
    count = this.length - 1;
    while (count !== ind) {
      current = current.prev;
      count--;
    }
  }
  return current;
}
```

- `set` 메소드
  - 인덱스와 값을 인자로 받아 해당 인덱스에 해당하는 노드의 값을 인자로 받은 값으로 업데이트해주는 함수
  - `get`메소드를 사용하여 노드를 찾음
    - `get` 메소드로 유효한 노드가 반환되면 해당 노드의 값을 입력한 값으로 바꾼 후 `true` 반환
    - 유효한 노드가 아닐 경우 `false` 반환

```javascript
set(ind, val) {
  var selNode = this.get(ind);
  if (!selNode) {
    return false;
  } else {
    selNode.val = val;
    return true;
  }
}
```

- `insert` 메소드
  - 입력된 인덱스와 값으로 해당 위치에 값을 가진 새로운 노드를 만들어내는 함수
  - 인덱스가 0보다 작거나 리스트의 길이보다 크거나 같을때 `false` 반환
  - 인덱스가 0일때, `unshift` 사용
  - 인덱스가 리스트의 길이와 같을때, `push` 사용
  - 그 외에, `get` 메소드를 통해 `index - 1`위치의 노드에 접근
    - `next`와 `prev` 프로퍼티 업데이트
    - 길이를 1 증가시킨 후, 리스트 반환

```javascript
insert(ind, val) {
  if (ind < 0 || ind >= this.length) return false;
  if (ind === 0) return this.unshift(val);
  if (ind === this.length) return this.push(val);

  var prevNode = this.get(ind - 1);
  var nextNode = prevNode.next;
  var newNode = new Node(val);

  newNode.prev = prevNode;
  newNode.next = nextNode;
  prevNode.next = newNode;
  nextNode.prev = newNode;

  this.length++;
  return this;
}
```

- `remove` 메소드
  - 입력된 인덱스 위치의 노드를 제거하는 함수
  - 인덱스가 0보다 작거나 리스트의 길이보다 크거나 같으면 `undefined` 반환
  - 인덱스가 0일경우 `shift` 메소드 사용
  - 인덱스가 리스트의 길이보다 1 작을 경우 `pop` 메소드 사용
  - 그 외에 `get` 메소드를 통해 제거해야 하는 노드를 찾음
    - 인접한 노드의 `next`와 `prev` 프로퍼티 업데이트
    - 제거된 노드의 `next`와 `prev` 프로퍼티를 `null`로 설정
    - 마지막으로 길이를 1 감소시킨 후, 제거된 노드 반환

```javascript
remove(ind) {
  if (ind < 0 || ind >= this.length) return undefined;
  if (ind === 0) return this.shift();
  if (ind === this.length - 1) return this.pop();
  var selNode = this.get(ind);
  var prevNode = selNode.prev;
  var nextNode = selNode.next;
  prevNode.next = nextNode;
  nextNode.prev = prevNode;
  selNode.next = null;
  selNode.prev = null;
  this.length--;
  return selNode;
}
```
<br/>

## 이중 연결 리스트: 빅오 복잡도

- Insertion - `O(1)`
- Removal - `O(1)`
- Searching - `O(n)`
- Access - `O(n)`