---
title: 트리 - 이진 탐색 트리
date: '2023-08-16'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: 트리 - 트리 및 이진 탐색 트리 정의, 구현
---

# 트리란?

트리 (Tree)란 노드들이 나무 가지처럼 연결된 비선형 계층적 자료구조이다. <br/>

![tree](https://github.com/wontae99/wontae99-blog/assets/109476712/13438d2d-687c-4555-ad0d-57d33ec425ae)

트리는 연결 리스트처럼 노드로 이루어진 데이터 구조인데 이때 노드들 사이에 부모-자식 관계가 있다. 리스트와 차이점은 리스트는 선형인 반면, 트리는 비선형구조이다. 즉, 리스트는 데이터 구조 속에 한 갈래 길 밖에 없는 반면에, 트리는 갈 수 있는 경로가 여러 갈래 일 수 있다.

자식 노드에서 부모 쪽으로 계속해서 타고 올라가다 보면 결국 부모가 없는 하나의 노드로 이어지게 되는데, 이 노드를 루트 노드(root node)라고 부르며, 루트 노드를 중심으로 뻗어나가는 모습이 나무의 구조와 비슷하여 '트리'라는 이름이 붙었다고 한다.

## 트리 용어 정리

- 노드(node): 트리를 구성하는 기본 원소
  - 루트 노드(root node/root): 트리에서 부모가 없는 최상위 노드, 트리의 시작점
  - 부모 노드(parent node): 루트 노드 방향으로 직접 연결된 노드
  - 자식 노드(child node): 루트 노드 반대방향으로 직접 연결된 노드
  - 형제 노드(siblings node): 같은 부모 노드를 갖는 노드들
  - 리프 노드(leaf node/leaf): 루트 노드를 제외한 차수가 1인 정점을 뜻한다. 쉽게 말해 `자식이 없는 노드`. 단말 노드라 부르기도 한다.
- 간선 (edge): 노드와 노드 간의 연결선
- 경로(path): 한 노드에서 다른 한 노드에 이르는 길 사이에 있는 노드들의 순서
- 길이(length): 출발 노드에서 도착 노드까지 거치는 간선의 개수
- 깊이(depth): 루트 경로의 길이
- 레벨(level): 루트 노드(level=0)부터 노드까지 연결된 간선 수의 합
- 높이(height): 가장 긴 루트 경로의 길이
- 차수(degree): 각 노드의 자식의 개수
- 크기(size): 노드의 개수
- 너비(width): 가장 많은 노드를 갖고 있는 레벨의 크기

## 트리의 사용 예시

- HTML DOM
- 네트워크 라우팅(메시지가 한개의 노드나 여러 노드에 전달)
- 추상 구문 트리
- 인공 지능
- 폴더, 파일 시스템

<br/>

# 이진 트리, 이진 탐색 트리(Binary Search Tree)

`이진트리`란 자식노드가 최대 두 개인 노드들로 구성된 트리이다. <br/> `이진 탐색 트리(Binary Search Tree)`는 모든 왼쪽 자식의 값이 루트나 부모보다 작고, 모든 오른쪽 자식의 값이 루트나 부모보다 큰 값을 가진다.

## 이진 트리 순회 방법

트리 순회 방법은 방향에 따라서 크게 두 가지로 나눌 수 있다:

1. 너비 우선 탐색(Breadth-First Search)
2. 깊이 우선 탐색(Depth-First Search)

간단히 말하면, 너비 우선 탐색(BFS)은 수평으로, 깊이 우선 탐색(DFS)은 수직으로 탐색하는 방법이다.

- DFS
  - 중위 순회(in-order traversal): 왼쪽 자손, 자신, 오른쪽 자손 순서로 방문하는 순회 방법. 이진 탐색 트리를 중위 순회하면 정렬된 결과를 얻을 수 있다.
  - 전위 순회(pre-order traversal): 자신, 왼쪽 자손, 오른쪽 자손 순서로 방문하는 순회 방법.
  - 후위 순회(post-order traversal): 왼쪽 자손, 오른쪽 자손, 자신 순서로 방문하는 순회 방법.

- BFS
  - 레벨 순서 순회(level-order traversal): `너비 우선 순회(Breadth-First traversal)`라고도 한다. 노드를 레벨 순서로 방문하는 순회 방법. 위의 세 가지 방법은 `스택`을 활용하여 구현할 수 있는 반면 레벨 순서 순회는 `큐`를 활용해 구현할 수 있다.


### DFS와 BFS는 언제 사용될까?

결과적으로 어차피 모든 노드를 한 번씩 방문하기 때문에, 두 탐색 방법의 시간 복잡도는 동일하다.

차이점은 공간 복잡도인데, 어떤 탐색 방법을 사용해야할지는 트리의 구조에 달려 있다.

만약 트리가 아주 넓다면 BFS는 큐를 저장하는데 더 많은 공간을 사용할 것이고 <br/> 깊고 긴 트리라면 DFS가 더 많은 공간을 사용할 것이다.

또한 순회로 탐색된 데이터를 어떤 형태로 얻고 싶은지에 따라 달라질 수 있다.

`중위 순회(in-order)`방식으로 얻어진 데이터는 크기로 정렬될 것이다.

`전위 순회(pre-order)`방식은 자신-왼쪽-오른쪽 순서로 탐색하기때문에, 트리를 복사하거나 평탄화하여 데이터베이스 같은 곳에 저장해 두었다가 나중에 연쇄 구조로 다시 만들어낼때 도움이 될 수 있다.


### 이진트리 순회 예시

![tree-traverse](https://github.com/wontae99/wontae99-blog/assets/109476712/4b7f3291-f282-4173-8a92-7505b875ba5c)

위의 트리를 순회하면 다음과 같다.

- In-order(중위 순회): 1 3 4 6 7 8 10 13 14
- Pre-order(전위 순회): 8 3 1 6 4 7 10 14 13
- Post-order(후위 순회): 1 4 7 6 3 13 14 10 8
- Level-order(너비 우선 순회): 8 3 10 1 6 14 4 7 13

## 이진 탐색 트리 구현

- Node 클래스

```javascript
class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}
```

- BST 클래스

```javascript
class BinarySearchTree {
  constructor() {
    this.root = null
  }
}
```

- insert 메소드
  - 트리에 새로운 노드를 삽입하는 함수
  - 루트에서 시작
    - 루트가 없다면 새 노드가 루트가 됨
    - 루트가 있다면 새 노드 값과 루트 노드 값의 크기 비교
    - 이후 자식 노드에도 반복

```javascript
insert(val) {
  var newNode = new Node(val);
  if (!this.root) {
    this.root = newNode;
    return this;
  }
  var current = this.root
  while (true) {
    if (val > current.val) {
      if (current.right === null) {
        current.right = newNode;
        return this;
      } else {
        current = current.right;
      }
    } else if (val < current.val) {
      if (current.left === null) {
        current.left = newNode;
        return this;
      } else {
        current = current.left;
      }
    } else {
        // Case: val === current.val
      console.log('Input already exists.');
      return this;
    }
  }
}
```

[해당 이미지 트리 구현](#이진트리-순회-예시)

```javascript
var tree = new BinarySearchTree()
tree.insert(8)
tree.insert(3)
tree.insert(10)
tree.insert(14)
tree.insert(1)
tree.insert(6)
tree.insert(13)
tree.insert(4)
tree.insert(7)
```

결과값

![BST](https://github.com/wontae99/wontae99-blog/assets/109476712/96870d89-443f-41b8-b6d0-9f07b879611e)

- find 메소드
  - 루트에서 시작
  - 찾고자하는 값을 루트 노드와 비교
    - 크다면 오른쪽으로 탐색 반복
    - 작다면 왼쪽으로 탐색 반복

```javascript
find(val) {
  if (this.root === null) return false;
  var current = this.root;
  var found = false;
  while (current && !found) {
    if (val > current.val) {
      current = current.right;
    } else if (val < current.val) {
      current = current.left;
    } else {
      found = true;
    }
  }
  if (!found) return undefined;
  return current;
}
```

- BFS 메소드
  - 큐를 배열로 만들어 구현
  - 루트 노드부터 시작하여 좌우로 자식 노드가 있는지 체크하여 있다면 그 값을 큐 배열에 넣음
  - 방문한 노드의 값을 다른 배열에 기록해 넣음
  - 큐가 비어있다면(방문할 노드가 더 이상 없다면), 방문한 노드를 기록해 두었던 배열을 반환

```javascript
BFS() {
  var node = this.root,
    data = [],
    queue = [];

  queue.push(node);

  while (queue.length) {
    node = queue.shift();
    data.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return data;
}
```

결과값

![BFS](https://github.com/wontae99/wontae99-blog/assets/109476712/5f0a07ca-9448-4244-9e9d-033b429f9ff4)

- DFS - 전위 순회(pre-order)
  - 방문했던 노드의 값을 저장할 변수 생성
  - 재귀적으로 부모 노드를 기준으로 왼쪽 자식 노드들이 있다면 우선 탐색 후 오른쪽 자식 노드들을 탐색할 함수 정의
  - 재귀 함수 실행 후 방문한 노드 값을 저장한 배열 반환

```javascript
DFSPreOrder() {
  var data = [];
  function traverse(node) {
    data.push(node.val);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  traverse(this.root);

  return data
}
```

결과값

![pre-order](https://github.com/wontae99/wontae99-blog/assets/109476712/a3d9fbcf-293d-4e87-9a8a-786c0fbf9ce3)

- DFS - 후위 순회(post-order)
  - 전위 순회에서 방문한 노드의 값을 기록 후 탐색 했던 것과 반대로, 노드가 있는지 확인 후(하위 트리까지 도달하기 위해) 방문한 노드의 값을 기록

```javascript
DFSPostOrder() {
  var data = [];
  function traverse(node) {
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    data.push(node.val);
  }
  traverse(this.root);

  return data
}
```

결과값

![post-order](https://github.com/wontae99/wontae99-blog/assets/109476712/c33ef403-6615-472a-9886-b46b19684d67)

- DFS - 중위 순회(in-order)
  - 왼쪽 자손, 자신, 오른쪽 자손 순서로 방문하는 순회
  - 왼쪽 자손 노드가 있는지 먼저 확인 후 값을 기록
  - 결과값으로 크기로 정렬된 배열이 반환되어야함

```javascript
DFSInOrder() {
  var current = this.root;
  var data = [];
  function traverse(current) {
    if (current.left) traverse(current.left);
    data.push(current.val);
    if (current.right) traverse(current.right);
  }
  traverse(current);

  return data;
}
```

결과값

![in-order](https://github.com/wontae99/wontae99-blog/assets/109476712/2531ab38-2d70-4f9d-ab10-aa3b138b6d44)

<br/>

## 이진 탐색 트리의 빅오

아래 시간 복잡도는 모든 이진 탐색 트리에서의 값이 아닌 평균적인 경우에서 계산된 값이다.

- Insertion - O(log n)
- Searching - O(log n)
