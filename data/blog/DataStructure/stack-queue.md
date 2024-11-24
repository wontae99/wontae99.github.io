---
title: Stack & Queue (스택 & 큐)
date: '2023-08-15'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: 스택과 큐 개념/비교/구현
---

# Stack

Stack은 쌓아 올린다는 것을 의미한다. 즉, stack 자료구조는
책을 쌓는 것처럼 차곡차곡 쌓아올린 형태의 자료구조를 의미한다. <br/>
또한, 스택은 후입선출(Last-In-First-Out) 원칙을 따르는 데이터들의 모음이다.

## 스택의 특징

스택은 `같은 구조와 크기의 자료`를 정해진 방향으로만 쌓을 수 있고, top으로 정한 곳을 통해서만 접근할 수 있다. <br/>
즉, top의 가장 위에 있는 자료는 가장 최근에 들어온 자료를 가리키고 있으며, 삽입되는 새 자료 또한 top이 가리키는 자료의 위에 쌓이게 된다. <br/>
스택에서 자료를 삭제할 때도 top을 통해서만 가능하다.
스택에서 top을 통해 삽입하는 연산을 `push`, top을 통해 삭제하는 연산을 `pop`이라고 한다.
<br/>
따라서 스택은 시간 순서에 따라 자료가 쌓이게 되며 가장 마지막에 삽입된 자료가 가장 먼저 삭제된다는 구조적 특징을 가진다. 이 구조를 `후입선출(LIFO) 구조`라고 한다.

## 스택의 활용 예시

- 함수 호출을 다룰때
- 실행 취소 / 재실행 : 가장 나중에 실행된 것부터 실행을 취소
- Routing(브라우저의 히스토리) : 가장 나중에 열린 페이지부터 보여줌

## 스택 자료구조 구현

이전에 구현 했던 [단일 연결 리스트](https://wontae99.vercel.app/blog/DataStructure/singly-linked-list)를 활용해서 스택을 구현해 보겠다. <br/>

먼저 스택과 노드 클래스이다.

- Stack 클래스

```javascript
class Stack {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }
}
```

- Node 클래스

```javascript
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}
```

단일 연결 리스트에서 마지막 노드를 추가/제거 하기위해서 전체 노드를 iterate 해야 했기때문에 리스트의 맨 앞에서 추가/제거 작업을 해준다. <br/>
따라서 가장 마지막에 들어오는 노드가 `first`가 되고 가장 먼저 나가게 되는 노드 또한 `first`이다.

- `push` 메소드
  - 새로운 노드를 `first`가 되도록함
  - size를 1 증가시킨 후, 스택 반환

```javascript
push(val) {
  var newNode = new Node(val);
  if (this.size === 0) {
    this.first = newNode;
    this.last = newNode;
  } else {
    var temp = this.first;
    this.first = newNode;
    this.first.next = temp;
  }
  ++this.size;
  return this;
}
```

- `pop` 메소드
  - `first`에 위치한 노드의 값 반환하는 함수
  - 스택의 사이즈가 0일때 `null`반환

```javascript
pop() {
  if (this.size === 0) return null;
  var temp = this.first;
  if (this.first === this.last) {
    this.last = null;
  }
  this.first = this.first.next;
  this.size--;
  return temp.val;
}
```

## 스택의 빅오

스택을 다룰 때 중요한 것은 `삽입`과 `제거`이다. <br/> 스택의 경우 맨 앞에서 삽입/제거가 모두 이루어지기 때문에 스택 전체를 순회할 필요가 없어 상수 값을 가지게 된다.

- Insertion - O(1)
- Removal - O(1)
- Searching - O(n)
- Access - O(n)

# Queue

Queue는 사전적으로 줄 또는 줄을 서서 기다리는 행위를 의미한다. <br/>
즉, Queue 자료구조는 먼저 줄을 선 사람이 먼저 입장하듯이 `선입선출(Fisrt-In-First-Out)` 방식의 자료구조를 의미한다.

## 큐의 특징

스택에서는 정해진 한 곳을 통해 삽입/삭제가 이루어진 반면에 <br/>
큐는 한쪽 끝에서 삽입 작업이, 다른 끝에서 삭제 작업이 이루어진다. 이때 큐의 삽입연산을 `enQueue`, 삭제연산을 `deQueue`라고 한다.

## 큐의 활용 예시

주로 데이터가 입력된 시간 순서대로 처리해야 할 필요가 있는 상황에 이용한다.

- 컴퓨터의 백그라운 작업
- 리소스 업로드
- 프린트 인쇄 대기열
- 캐시(Cache) 구현

<br/>

## 큐 자료구조 구현

- Node 클래스

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

- Queue 클래스

```javascript
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
}
```

- enqueue
  - stack의 push와 비슷한 역할
  - 리스트의 가장 마지막에 노드를 추가

```javascript
enqueue(val) {
  var newNode = new Node(val);
  if (!this.first) {
    this.first = newNode;
    this.last = newNode;
  } else {
    this.last.next = newNode;
    this.last = newNode;
  }
  ++this.size;
  return this;
}
```

- dequeue
  - stack의 pop과 비슷한 역할
  - 리스트의 가장 앞의 노드를 제거

```javascript
function dequeue() {
  if (!this.first) return null;
  var temp = this.first;
  if (this.first === this.last) {
    this.last = null;
  }
  this.first = this.first.next;
  this.size--;
  return temp.val;
}
```

## 큐의 빅오

스택과 마찬가지로 삽입/제거 작업이 상수 값을 갖게 되며, 큐 작업 역시 데이터의 삽입과 제거가 중요한 자료 구조이다.

- Insertion - O(1)
- Removal - O(1)
- Searching - O(n)
- Access - O(n)