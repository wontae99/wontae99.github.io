---
title: 힙 - 이진 힙, 우선 순위 큐
date: '2023-08-17'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: 힙 - 힙 및 이진 힙, 우선 순위 큐 정의, 구현
---

# 목표

- 힙에 대해 정의한다
- 최소 힙과 최대 힙을 비교한다
- 힙과 기본적인 메소드를 추가한다
- 힙이 사용되는 예시와 힙을 사용해서 만들 수 있는 데이터 구조를 알아본다

# 힙

힙은 트리 구조의 일종으로 `우선 순위 큐`를 위해 만들어진 자료 구조이다. 이진 탐색 트리와 매우 비슷하지만 다른 규칙을 가지고 있다. <br/>

힙은 이진 탐색 노드와 마찬가지로 각 노드는 언제나 최대 두 개의 자식을 가진다. 하지만, 이진 탐색 트리와는 다르게 왼쪽과 오른쪽에는 순서가 존재하지 않는다. <br/>
또한 중복된 값을 허용하지 않았던 이진 탐색 트리와는 다르게 힙은 중복된 값이 허용된다

# 최대 이진 힙

- 각 부모는 최대 두개의 노드를 가진다
- 최대 이진 힙에서 부모 노드 값은 언제나 자식 노드보다 크다 (형제 노드 사이에는 해당 규칙 적용 ❌)
- 이진 힙은 언제나 최적의 용량을 가진다 (이진 탐색 트리는 연결 리스트 처럼 한쪽으로 치우쳐진 형태를 가질 수 있지만 이진 힙은 가능한 적은 공간을 차지한다, 한 줄에서 왼쪽 자식이 언제나 먼저 채워진다)

최대 이진 힙에서는 부모 노드가 항상 자식 노드보다 큰 값을 갖는다. 반대로, 최소 이진 힙에서는 부모 노드가 언제나 양쪽의 자식 노드의 값보다 작다.

## 최대 이진 힙 구현

이진 힙 구현에 앞서 해당 규칙을 알아 놔야한다.

![max binary heap](https://github.com/wontae99/wontae99-blog/assets/109476712/2e94d50a-4099-4227-b414-fbc2908afbe6)

이진 힙은 최대 두개의 노드를 가질 수 있으며, 최적의 용량을 가지는 구조를 갖기 때문에 인덱스 n에 있는 자식 노드의 부모의 인덱스는 (n-1)/2 라는 규칙을 가지고 있다.

이러한 규칙을 이용하여 새로운 노드를 추가하여 추가된 노드가 알맞는 자리를 가질 수 있도록 재정렬 해주는 함수를 구현할 수 있다.

- MaxBinaryHeap 클래스
  - 각 노드의 값을 담을 빈 배열로 시작한다
  - 배열은 루트 노드를 시작으로 왼쪽 자식노드 부터 오른쪽으로 순서대로 노드의 값을 요소로 갖는다.

```javascript
class MaxBinaryHeap {
  constructor() {
    this.values = []
  }
}
```

- insert 메소드
  - 힙에 인자로 받은 값을 추가
  - 그 값을 알맞는 자리로 가도록 정렬(`bubbleUp` 함수)
    - 배열의 맨 뒤에 추가된 요소의 인덱스를 `index` 변수로 저장
    - (`index`-1)/2 의 내림 값으로 부모 인덱스 값 변수로 저장
    - 부모 인덱스에 있는 값과 배열 맨 뒤에 추가된 값을 비교
      - 추가한 값이 크다면 두 값의 자리를 바꾼 후 과정을 반복
      - 부모 노드의 값이 더 크다면 그대로 둠

`insert` 메소드를 구현하기 전에 `bubbleUp` 함수를 먼저 작성한다. (`insert` 메소드는 배열에 값을 추가한 후 `bubbleUp`으로 정렬해주면 끝)

```javascript
bubbleUp() {
    // 추가된 값의 인덱스 idx 변수에 저장
  let idx = this.values.length - 1;
  const element = this.values[idx];
  while (idx > 0) {
    let parentIdx = Math.floor((idx - 1) / 2);
    let parent = this.values[parentIdx];

    // 부모 노드 값이 추가된 값보다 크다면 정렬 완료
    if (element <= parent) break;
    this.values[parentIdx] = element;
    this.values[idx] = parent;
    idx = parentIdx;
  }
}
```

`insert` 메소드

```javascript
insert(val) {
  this.values.push(val);
  this.bubbleUp();

  return this;
}
```

- extractMax 메소드
  - 최대 이진 힙의 가장 큰 힙(루트 노드)을 제거하는 함수
  - 힙 제거 후 모든 노드가 알맞는 자리에 있도록 정렬(`sinkDown` 메소드)
    - 부모 인덱스는 0부터 시작(루트 노드)
    - 왼쪽 자식 노드의 인덱스는 `2 * index + 1`, 오른쪽 자식 노드의 인덱스는 `2 * index + 2` 임을 이용하여 값을 비교
    - 왼쪽/오른쪽 자식 노드가 부모 노드보다 값이 크다면 자리를 바꿈, 만약 두 자식 노드 모두 부모 보다 크다면 더 큰 자식 노드와 바꿈
    - 모든 자식 노드의 값이 부모 노드 값보다 작게 될때까지 루핑
  - 제거된 루트 노드 값 반환

insert 메소드와 마찬가지로 `extractMax` 메소드를 작성하기 전에 정렬 함수 `sinkDown` 메소드를 먼저 작성하였다.

```javascript
sinkDown() {
  let idx = 0;
  const length = this.values.length;
  const element = this.values[0];

  while (true) {
    let leftChildIdx = 2 * idx + 1;
    let rightChildIdx = 2 * idx + 2;
    let leftChild, rightChild;
    let swap = null;

    if (leftChildIdx < length) {
      leftChild = this.values[leftChildIdx];
      if (leftChild > element) {
        swap = leftChildIdx;
      }
    }
    if (rightChildIdx < length) {
      rightChild = this.values[rightChildIdx];
      // leftChild <= element 이고 rightChild > element일때
      if ((swap === null && rightChild > element) ||
      // 왼쪽, 오른쪽 자식노드 값이 모두 부모보다 크고
      // 오른쪽 노드가 왼쪽노드 값 보다 클때
      (swap !== null && rightChild > leftChild)) {
        swap = rightChildIdx;
      }
    }
    // 부모 노드 값이 자식 노드 값보다 크면 루프 탈출
    if (swap === null) break;
    this.values[idx] = this.values[swap];
    this.values[swap] = element;
    idx = swap;
  }
}
```

`extractMax` 메소드

```javascript
extractMax() {
  const max = this.values[0];
  const end = this.values.pop();
  if (this.values.length > 0) {
    this.values[0] = end;
    this.sinkDown();
  }

  return max;
}
```

# 우선 순위 큐 (Priority Queue)

우선 순위 큐는 각 요소가 그에 해당하는 우선순위를 갖는 데이터 구조이다. 그리고 더 높은 우선순위를 가진 요소가 더 낮은 우선순위를 가진 요소보다 먼저 처리된다.

우선 순위 큐는 힙과는 별개의 개념으로 배열이나 리스트로도 구현할 수 있다. 하지만 힙을 사용하는 것이 가장 고전적이고 효율적인 방법이다.

## 우선 순위 큐 구현

이번엔 최소 이진 힙을 사용하여 우선 순위 큐를 구현해 보겠다. 즉, 더 적은 숫자 값이 더 높은 우선 순위를 의미하게 된다.

- Node 클래스
  - 각 노드에 값과 우선순위를 저장

```javascript
class Node {
  constructor(val, prior) {
    this.val = val
    this.prior = prior
  }
}
```

- PriorityQueue 클래스

```javascript
class PriorityQueue {
  constructor() {
    this.values = []
  }
}
```

- enqueue 메소드

```javascript
enqueue() {
  let newNode = new Node(val, prior);
  this.values.push(newNode);
  this.bubbleUp();
}
```

여기에 적힌 bubbleUp 메소드는 이전에 작성한 코드와 거의 동일하지만 한 가지 차이점이 있다. 우선 순위 큐에서의 노드는 값을 비교하는 것이 아닌 우선 순위(prior)를 비교해야 한다.

```javascript
bubbleUp() {
  let idx = this.values.length - 1;
  const element = this.values[idx];
  while (idx > 0) {
    let parentIdx = Math.floor((idx - 1) / 2);
    let parent = this.values[parentIdx];

    // 우선 순위를 비교해야 하기때문에 prior 속성을 비교
    if (element.prior <= parent.prior) break;
    this.values[parentIdx] = element;
    this.values[idx] = parent;
    idx = parentIdx;
  }
}
```

- dequeue 메소드

```javascript
dequeue() {
  const max = this.values[0];
  const end = this.values.pop();
  if (this.values.length > 0) {
    this.values[0] = end;
    this.sinkDown();
  }

  return max;
}
```

`dequeue` 메소드에서도 마찬가지로 `sinkDown`메소드에서 값을 비교하지 않고 `prior`을 비교해야 한다.

```javascript
sinkDown() {
  let idx = 0;
  const length = this.values.length;
  const element = this.values[0];
  while (true) {
    let leftChildIdx = 2 * idx + 1;
    let rightChildIdx = 2 * idx + 2;
    let leftChild, rightChild;
    let swap = null;

    if (leftChildIdx < length) {
      leftChild = this.values[leftChildIdx];
      // 우선순위 속성 비교
      if (leftChild.prior > element.prior) {
        swap = leftChildIdx;
      }
    }
    if (rightChildIdx < length) {
      rightChild = this.values[rightChildIdx];
      if (
        // 우선순위 속성 비교
        (swap === null && rightChild.prior > element.prior) ||
        (swap !== null && rightChild.prior > leftChild.prior)
      ) {
        swap = rightChildIdx;
      }
    }
    if (swap === null) break;
    this.values[idx] = this.values[swap];
    this.values[swap] = element;
    idx = swap;
  }
}
```

# 이진 힙의 빅오

이진 힙은 최대 힙이든 최소 힙이든 상관없이 삽입과 삭제에 있어서 성능이 뛰어나다.

(로그 베이스 숫자는 10이 아닌 2이다)
- 삽입 - O(log N)
- 삭제 - O(log N)
- 탐색 - O(N)