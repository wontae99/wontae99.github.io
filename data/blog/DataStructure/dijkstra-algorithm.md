---
title: 다익스트라 알고리즘
date: '2023-08-20'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: 다익스트라 알고리즘 - 가중 그래프, 이진 힙
---

# 다익스트라 알고리즘

이전에 다뤘던 BFS을 이용한 최단 거리 계산 알고리즘은 비가중(unweighted), 무방향(undirected) 그래프에서 사용되는 반면에 다익스트라 알고리즘은 `우선 순위 큐`를 사용하여 가중 그래프에서 최단 거리 계산을 할 수 있다.

다익스트라 알고리즘의 응용

- GPS 등 지도 관련 소프트웨어
- 네트워크 라우팅
- 생물학 - 바이러스가 퍼지는 모델에 사용
- 항공 티켓 - 목적지까지 가장 싼 루트 탐색

# 코드로 구현

- PriorityQueue 클래스
  - 큐를 삽입 후 정렬하는 enqueue 메소드, 큐를 제거하는 dequeue 메소드 (이전 포스트에서 구현한 우선순위 큐 코드 사용)

```javascript
class PriorityQueue {
  constructor() {
    this.values = []
  }
  enqueue(val, priority) {
    let newNode = new Node(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
  }
  bubbleUp() {
    let idx = this.values.length - 1
    const element = this.values[idx]
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2)
      let parent = this.values[parentIdx]
      if (element.priority >= parent.priority) break
      this.values[parentIdx] = element
      this.values[idx] = parent
      idx = parentIdx
    }
  }
  dequeue() {
    const min = this.values[0]
    const end = this.values.pop()
    if (this.values.length > 0) {
      this.values[0] = end
      this.sinkDown()
    }
    return min
  }
  sinkDown() {
    let idx = 0
    const length = this.values.length
    const element = this.values[0]
    while (true) {
      let leftChildIdx = 2 * idx + 1
      let rightChildIdx = 2 * idx + 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx]
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx]
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx
        }
      }
      if (swap === null) break
      this.values[idx] = this.values[swap]
      this.values[swap] = element
      idx = swap
    }
  }
}
```

<br/>

- WeightedGraph 클래스
  - 정점을 추가하는 `addVertex` 메소드, 간선을 추가하는 `addEdge` 메소드

```javascript
class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ node: v2, weight })
    this.adjacencyList[v2].push({ node: v1, weight })
  }
}
```

<br/>


- `Dijkstra` 메소드
  1. 가장 작은 거리 값을 가진 노드를 골라서 먼저 방문
  2. 그 노드로 이동한 후 인접점들 각각에 대해 시작 노드 부터 인접점까지 거리의 합을 구함
  3. 현재 알고 있는 값보다 더 작은 거리 값이 나오면 값을 업데이트

```javascript
Dijkstra(start, finish) {
  const nodes = new PriorityQueue();
  const distances = {};
  const previous = {};
  let path = [];  // 마지막에 반환
  let smallest;
  // 이니셜 스테이스 설정
  for (let vertex in this.list) {
    if (vertex === start) {
      distances[vertex] = 0;
      nodes.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      nodes.enqueue(vertex, Infinity);
    }
    previous[vertex] = null;
  }
  // 방문할 노드가 남아 있을때까지 루핑
  while (nodes.values.length) {
    smallest = nodes.dequeue().val;
    if (smallest === finish) {
        // 마지막에 반환할 path 배열에 값을 넣음
      while (previous[smallest]) {
        path.push(smallest);
        smallest = previous[smallest];
      }
      break;
    }
    if (smallest || distances[smallest] !== Infinity) {
      for (let neighbor in this.list[smallest]) {
        //인접 노드 찾기
        let nextNode = this.list[smallest][neighbor];
        //인접노드까지 거리 계산
        let candidate = distances[smallest] + nextNode.weight;
        let nextNeighbor = nextNode.node;
        if (candidate < distances[nextNeighbor]) {
          //최단거리 업데이트
          distances[nextNeighbor] = candidate;
          //이전 노드 업데이트
          previous[nextNeighbor] = smallest;
          //새로운 우선순위를 가지고 있는 큐 생성
          nodes.enqueue(nextNeighbor, candidate);
        }
      }
    }
  }
  return path.concat(smallest).reverse();
}
```

## 코드 실행

위의 코드로 아래의 그래프를 테스트 해보자

![Graph](https://github.com/wontae99/wontae99-blog/assets/109476712/a29c3d8e-63c7-4599-913a-8d7296dd6dcc)

해당 그래프를 만들기 위한 코드와 그 A-E까지 최단거리 경로는 다음과 같다

```javascript
var graph = new WeightedGraph()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addVertex('D')
graph.addVertex('E')
graph.addVertex('F')

graph.addEdge('A', 'B', 4)
graph.addEdge('A', 'C', 2)
graph.addEdge('B', 'E', 3)
graph.addEdge('C', 'D', 2)
graph.addEdge('C', 'F', 4)
graph.addEdge('D', 'E', 3)
graph.addEdge('D', 'F', 1)
graph.addEdge('E', 'F', 1)

graph.Dijkstra('A', 'E')
```

결과

![result](https://github.com/wontae99/wontae99-blog/assets/109476712/e3eadaa4-835c-496d-a1ae-660b402b8473)
