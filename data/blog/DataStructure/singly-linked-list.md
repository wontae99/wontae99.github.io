---
title: Singly Linked List(단일 연결 리스트)
date: '2023-08-13'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: singly linked list 정의 및 코드 구현
---

# 연결 리스트(Linked List)

링크드 리스트(Linked List, 연결 리스트)는 데이터들을 저장하기 위해 사용되는 데이터 구조이다.

어레이 처럼 순서에 따라 다수의 데이터를 저장할 수 있다. 어레이와 다른 점이 있다면, 어레이에서는 각 데이터 엘리먼트들이 번호에 의해 인덱스가 부여되는데 반해 연결 리스트는 인덱스가 없이 다음 데이터 엘리먼트를 가리키는 그저 다수의 데이터 엘리먼트들로 구성된다.
그리고 이때 각 엘리먼트들을 `노드(node)`라고 부른다.

따라서 연결 리스트들은 다수의 노드들로 구성되고, 각각의 노드는 문자열 혹은 숫자와 같은 하나의 데이터 엘리먼트를 저장한다. 각 노드들은 다음 노드를 가리키는 정보 역시 저장하고 있어야하며, 더 이상 다음 노드가 없을 경우 아무것도 없음을 의미하는 `null`을 저장하게 된다.

# 단일 연결 리스트(Singly Linked List)

`Singly Linked List`는 데이터들이 한쪽 방향으로만 연결 되어있는 것을 말합니다. 데이터가 저장되는 객체를 `node`라고 하며, 가장 첫번째 `node`를 `head`라고 부른다.

![SLL](https://github.com/wontae99/woncha-typescript/assets/109476712/1dc9bc78-36ed-49e4-ac00-6b44fc92de19)

위 그림과 같이 node는 value와 next 변수를 갖고 있다. value는 데이터가 저장되는 변수이고, next는 다음 index의 node를 가리키는 변수이다.

스택이나 큐 자료 구조를 구현하기 위해서 단방향 연결 리스트에 대한 이해가 필요하다.

## 코드 구현

- Node 클래스

각 노드에 값과 다음 노드를 가리키는 변수를 갖고 있도록 한다.

```javascript
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
```

- `SinglyLinkedList` 클래스
  - 맨 앞 노드를 `head` 속성에 저장. 없다면 `null`로 설정
  - 마지막 노드를 `tail` 속성에 저장. 없다면 `null`로 설정
  - 리스트의 길이를 `length` 속성에 저장

```javascript
class SinglyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
}
```

- `push` 메소드
  - 주어진 값을 받아들인 후 새로운 노드를 생성하는 함수
  - head가 없다면 리스트가 비어있음을 의미함. 이때, `head`와 `tail` 모두 새롭게 생성된 노드를 기리키도록 함
  - 리스트가 비어있지 않다면, 마지막 노드의 `next`를 새롭게 생성된 노드를 가리키도록 하고 `tail`이 새롭게 생성된 노드를 가리키도록 설정
  - 마지막으로 길이가 1만큼 증가

```javascript
push(val) {
  var newNode = new Node(val)
  if (!this.head) {
    this.head = newNode
    this.tail = this.head
  } else {
    this.tail.next = newNode
    this.tail = newNode
  }
  this.length++
  return this
}
```

- `pop` 메소드
  - 마지막 노드를 제거하는 함수. 리스트에 노드가 없을때, `undefined` 반환
  - 노드가 존재하는 리스트에서, 테일에 이를 때까지 전체 리스트를 루핑
  - 마지막에서 두 번째 노드의 `next` 속성을 `null`로 설정
  - `tail`이 마지막에서 두 번째 노드로 업데이트
  - 마지막으로 길이를 하나 감소시킨 후 리스트 반환

```javascript
pop() {
  var current = this.head
  var newTail = current
  if (this.length === 0) return undefined
  while (current.next) {
    newTail = current
    current = current.next
  }
  this.tail = newTail
  this.tail.next = null
  this.length--

  return this
}
```

- `shift` 메소드
  - 리스트의 맨 앞의 노드를 제거하는 함수. 리스트에 노드가 없다면 `undefined` 반환
  - 노드가 존재할 경우 현재의 헤드 속성을 변수에 저장하고 현재 헤드의 `next` 노드를 가리키도록 헤드 속성을 업데이트
  - 마지막으로 길이를 1 감소시킨 후 리스트 반환

```javascript
shift() {
  if (this.length === 0) return undefined
  var newHead = this.head.next
  this.head = newHead
  this.length--
  if (this.length === 0) {
    this.tail = null
  }
  return this
}
```

- `unshift` 메소드
  - 맨 앞에 노드를 추가하는 함수
  - 헤드가 없을 경우(리스트가 비어있을 경우) 새로운 노드가 리스트의 `head`와 `tail`이 됨
  - 노드가 이미 있을 경우, 새롭게 생성된 노드의 `next`를 현재의 헤드 값으로 설정 후, 헤드가 새롭게 생성된 노드를 가르키도록 함
  - 마지막으로, 리스트의 길이를 1 증가시킨 후 리스트 반환

```javascript
unshift(val) {
  var newHead = new Node(val)
  if (!this.head) {
    this.head = newHead
    this.tail = newHead
  } else {
    newHead.next = this.head
    this.head = newHead
  }
  this.length++
  return this
}
```

- `get` 메소드
  - 인덱스를 인자로 받는 함수
  - 인덱스가 음수이거나 리스트의 길이보다 크거나 같을 경우, `undefined` 반환
  - 루프를 통해 인덱스가 지정하는 위치에 이를 때까지 반복하서 이동한 다음 해당 인덱스 위치에 있는 노드를 반환

```javascript
function get(index) {
  if (index >= this.length || index < 0) return undefined
  var current = this.head
  for (let i = 0; i < index; i++) {
    current = current.next
  }
  return current
}
```

- `set` 메소드
  - 업데이트될 노드 인덱스와 값을 인자로 받아들이는 함수
  - 위에 정의한 `get` 메소드를 사용하여 업데이트 될 노드를 찾음
  - 노드를 찾지 못했다면 `false`를 반환
  - 노드를 찾았다면 해당 노드의 `value`를 업데이트 한 후 `true`를 반환

```javascript
set(ind, val) {
  var getNode = this.get(ind)
  if (getNode) {
    getNode.val = val
    return true
  }
  return false
}
```

- `insert` 메소드
  - 인덱스가 0보다 작거나 리스트의 길이보다 클 결우 `false` 반환
  - 인덱스가 리스트의 길이와 같을 경우, 리스트의 맨 마지막에 노드 삽입
  - 인덱스가 0일때, `unshift` 메소드 사용하여 리스트 맨 앞에 새로운 노드 삽입
  - 그 외의 경우, `get` 메소드를 사용하여 입력된 인덱스의 이전 노드를 호출하여, 해당 노드의 `next` 속성을 삽입될 노드로 업데이트
  - 새롭게 삽입될 노드의 `next` 속성 값은 호출된 노드의 이전 `next` 속성이었던 노드가 됨
  - 마지막으로 길이를 1만큼 증가시킨 후, `true` 반환

```javascript
insert(ind, val) {
  if (ind < 0 || ind > this.length) return false;
  if (ind === this.length) return !!this.push(val);
  if (ind === 0) return !!this.unshift(val);

  var newNode = new Node(val);
  var prev = this.get(ind - 1);
  var temp = prev.next;
  prev.next = newNode;
  newNode.next = temp;
  this.length++;
  return true;
}
```

- `remove` 메소드
  - 인덱스 값이 0보다 작거나 리스트 길이보다 클 경우 `undefined` 반환
  - 인덱스 값이 `length - 1`과 같을때, `pop` 메소드 사용
  - 인덱스 값이 0일때, `shift` 메소드 사용
  - 나머지 경우에서 `get` 메소드를 사용하여 `index - 1`의 노드 호출
  - 호출된 노드의 `next` 속성을 다음 노드의 `next` 속성 값으로 업데이트
  - 마지막으로 길이를 1 감소시키고 제거된 노드 반환

```javascript
remove(ind) {
  if (ind < 0 || ind > this.length) return undefined;
  if (ind === this.length - 1) return !!this.pop();
  if (ind === 0) return !!this.shift();

  var prev = this.get(ind - 1);
  var removed = prev.next;
  prev.next = removed.next;
  this.length--;

  return removed;
}
```

- `reverse` 메소드
  - 리스트를 역방향으로 변형하는 함수
  - `head`와 `tail`을 바꿈

```javascript
reverse() {
  // head를 노드 변수에 저장
  var node = this.head;
  this.head = this.tail;
  this.tail = node;

  var next;
  var prev = null;

  //리스트 전체를 루핑하여 prev 속성과 next 속성을 업데이트
  for (var i = 0; i < this.length; i++) {
    next = node.next;
    node.next = prev;
    prev = node;
    node = next;
  }
  return this;
}
```
<br/>

## 단일 연결 리스트: 빅오 복잡도

- Insertion - `O(1)`
- Removal - `O(1)` (맨뒤에 있는 노드를 삭제할 경우) / `O(n)` (맨 앞 노드를 삭제할 경우)
- Searching - `O(n)`
- Access - O(n)