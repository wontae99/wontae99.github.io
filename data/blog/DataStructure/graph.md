---
title: 그래프
date: '2023-08-20'
tags: ['snippet', 'CS', 'algorithm', 'data structure']
draft: false
summary: 그래프
---

# 목표

- 그래프(Graph)가 무엇인지 알아본다
- 다른 데이터 구조들과 그래프를 비교해본다
- 그래프의 사용 예시를 알아본다
- 인접 리스트를 활용하여 그래프를 코드로 구현해본다
- BFS와 DFS를 사용하여 그래프를 순회해본다
- 그래프 순회 알고리즘을 비교해본다

# 그래프

그래프는 유한하고 변할 수 있는 꼭지점이나 노드나 점들의 집합으로 구성된 비선형 데이터 구조이다. 이 꼭지점들의 집합에 순서가 없는 경우에는 무방향 그래프, 순서가 있다면 유방향 그래프 라고 한다.

즉, 그래프는 노드나 노드들의 연결을 모은 것이다.

![graph](https://github.com/wontae99/wontae99-blog/assets/109476712/3f0a9d43-2440-440f-8c19-b496b9d5cd9d)

## 그래프의 사용

- SNS (친구 관계 네트워크 구조 등)
- 지도/위치 기능
- 라우팅 알고리즘
- 파일 시스템 최적화

## 그래프 용어

- `정점(Vertex)` - 위치라는 개념(노드)
- 간선(Edge) - 노드 사이의 연결
- `가중(Weighted)` / `비가중(Unweighted)` - /할당 되지않은 그래프
  - 가중(Weighted) : 간선에 비용이나 가중치가 할당된 그래프
- `방향(Directed)` / `무방향(Undirected)`
  - 방향(Directed) : 간선에 방향성이 존재하여 한 방향으로만 갈 수 있다
  - 무방향(Undirected) : 무방향 그래프의 간선은 간선을 통해서 양 방향으로 갈 수 있다
  - ex) 인스타그램의 팔로워 시스템은 방향 그래프, 페이스북의 친구 시스템은 무방향 그래프로 볼 수 있다.
- 정점의 차수(degree): 무방향 그래프에서 하나의 정점에 인접한 정점의 수
  - 무방향 그래프에 존재하는 정점의 모든 차수의 합 = 그래프의 간선 수의 2배

# 그래프 구현

1. 인접 행렬(Adjacency Matrix)

![adj-matrix](https://github.com/wontae99/wontae99-blog/assets/109476712/c6a49ecd-acdc-4e31-a256-f0a022171354)

위의 그림은 왼쪽 그래프를 불린(Boolean) 행렬로 나타낸 것이다. 1은 각 노드간 연결이 있음을 의미하고 0은 연결이 없음을 의미한다.

무방향 그래프를 인접 행렬로 표현한다면 이 행렬은 대칭 행렬(Symmetric Matrix)이 된다.

2. 인접 리스트(Adjacency List)

인접 리스트(Adjacency List)로 그래프를 표현하는 것이 가장 일반적인 방법 이다.

![adj-list](https://github.com/wontae99/wontae99-blog/assets/109476712/85c7fea5-024d-4caa-9759-12df05e35b5d)

위에 그림은 좌측의 그래프를 배열과 배열의 각 인덱스마다 존재하는 또 다른 리스트를 이용해서 인접 리스트를 표현한 것이다.

위의 그림처럼 노드의 값이 숫자가 아닐때 혹은 숫자 사이에 큰 차이가 있다면 어떻게 할까?

그럴때는 다음 그림과 같이 해시 테이블을 사용하면 된다.

![adj-list-hash](https://github.com/wontae99/wontae99-blog/assets/109476712/e2f978fd-2829-428f-9cda-85ea9d5f239a)

## 인접 행렬 과 인접 리스트 비교

![bigO](https://github.com/wontae99/wontae99-blog/assets/109476712/37ceffcc-b7e9-4971-8f3d-ecd79eeb104a)

위의 그림은 각 상황에서 인접 리스트와 행렬의 빅오를 비교한 표이다.

정점을 추가/제거 할때, 인접 행렬에서의 빅오는 정점 개수의 제곱임을 알 수 있다. 이유인 즉슨, 행렬은 2차원 구조이므로, 하나의 정점을 추가하면 단순히 한 칸을 더하는 것이 아닌, 행 과 열 각각을 한 줄씩 추가해야 하기 때문이다.

결론적으로, 인접 행렬과 인접 리스트의 장단점은 다음과 같다.

- 인접 리스트

  - 👍 간선이 많지 않고 퍼져있는 그래프에서 더 적은 공간을 차지한다.
  - 👍 간선을 순회할때 빠르다
  - 👎 특정 간선이 존재하는 것을 확인하고자 할때, 느릴 수 있다. (O(|V| + |E|))

- 인접 행렬
  - 👎 간선이 많은 그래프에서 더 많은 공간을 차지 한다
  - 👎 간선을 순회할때 느리다
  - 👍 특정 간선을 확인할 때, 매우 빠르다 (O(1))

# 그래프-인접 리스트 구현

- Graph 클래스

```javascript
class Graph {
  constructor() {
    this.adjacencyList = {}
  }
}
```

- addVertext 메소드
  - 정점의 이름을 인자로 받아 정점을 추가하는 메소드
  - 인접 리스트에 이름을 key로, 빈 배열을 값으로 설정

```javascript
addVertex(vertex) {
  if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
}
```

- addEdge 메소드
  - 두개의 정점을 인자(v1, v2)로 받아 간선(edge)를 추가하는 메소드
  - adajacencyList에서 v1의 키를 찾아서 v2를 그 배열에 넣어 줌
  - 반대로 v2의 키를 찾아 v1을 배열에 넣음

```javascript
addEdge(v1, v2) {
  this.adjacencyList[v1].push(v2);
  this.adjacencyList[v2].push(v1);
}
```

- removeEdge 메소드
  - 두개의 정점을 인자로 받아 두 정점사이의 간선을 제거하는 메소드

```javascript
removeEdge(v1, v2) {
  this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2);
  this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1);
}
```

- removeVertex 메소드
  - 정점을 인자를 받아 해당 정점을 제거하는 메소드
  - 정점을 제거하면서 해당 정점과 연결된 간선들도 모두 제거 되어야 함(이전에 작성한 `removeEdge` 메소드 사용)

```javascript
function removeVertex(vertex) {
  while (this.adjacencyList[vertex].length) {
    const adjacentVertex = this.adjacencyList[vertex].pop()
    this.removeEdge(vertex, adjacentVertex)
  }
  // 인접 리스트에 있는 vertex 키 삭제
  delete this.adjacencyList[vertex]
}
```

# 그래프 순회(Graph Traversal)

그래프 순회는 모든 정점을 방문하는 작업이다.

순회라고 하면 방문, 최신화, 확인, 탐색, 출력 등을 그래프의 모든 정점에 대해 수행하는 것이다. 그래프 순회는 많은 곳에서 사용 된다

- p2p 네트워킹
- 웹 크롤러
- 최단 거리 계산
  - GPS
  - 미로 찾기
  - AI
- 유사 장르/상품 추천 시스템

## 깊이 우선 그래프(DFS) 순회

이전 포스트에서 트리에서의 그래프 순회를 다뤘다.

그래프의 DFS는 트리의 전위순회와 유사하고 순서는 다음과 같다.

1. 하나의 정점에서 시작
2. 간선을 따라 다음 정점으로 방문
3. 더 이상 탐색할 간선이 없으면 역추적(backtracking)을 통해 이전 정점으로 이동하면서 탐색하지 않은 간선이 있는지 확인
4. 탐색 가능한 간선이 있다면 다시 간선을 따라 다음 정점으로 이동
5. 모든 정점을 탐색할 때까지 3,4를 반복

![DFS](https://github.com/wontae99/wontae99-blog/assets/109476712/7443662c-9530-446d-b862-f0409856e19e)

## DFS 구현

### 재귀적 용법

- 시작하는 노드를 입력하는 함수 작성
- 빈 배열을 만들어 최종 결과를 저장
- 정점을 저장할 객체를 만듬
- 정점을 인자로 받는 helper 함수 작성
  - 정점이 비어있다면 끝
  - 입력한 정점을 방문 객체에 넣고 결과 배열에 정점을 push
  - 입력된 정점의 모든 인접점에 대해 루핑

```javascript
DFSRecursive(start) {
  const result = [];
  const visited = {};
  const adjacencyList = this.adjacencyList;

  // 헬퍼 함수 실행
  (function dfs(vertext) {
    if (!vertex) return null;
    visited[vertex] = true;
    result.push(vertex);

    adjacencyList[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        return dfs(neighbor);
      }
    });
  })(start);
}
```

### 반복적 용법

- 시작하는 노드를 입력하는 함수 작성
- 정점들을 추적할 배열 하나(stack)와 최종 결과를 저장할 배열 하나(result)를 만듬
- 방문한 정점들을 저장할 객체 생성
- stack에 시작 정점을 추가하여 방문함으로 표시 후 시작
- stack이 비어있지 않을 동안 루핑
  - 다음 정점을 stack으로부터 pop
  - 해당 정점을 아직 방문하지 않았다면
    - 방문함으로 표시
    - result에 추가
    - 인접점들을 모두 stack에 push

```javascript
function DFSIteravtive(start) {
  const stack = [start]
  const result = []
  const visited = {}
  let currentVertex

  visited[start] = true
  while (stack.length) {
    currentVertex = stack.pop()
    result.push(currentVertex)

    this.adjacencyList[currentVertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true
        stack.push(neighbor)
      }
    })
  }
  return result
}
```

## 너비 우선 순회(BFS)

너비 우선 탐색 (BFS: Breath First Search)은 그래프에서 최단 경로를 찾는 정점 기반 알고리즘이다.

BFS는 자식 정점을 방문하기 전에 형제 정점을 방문한다.

BFS는 레벨 순으로 운행하는데 순서는 다음과 같다.

1. 처음에 레벨 0에 있는 한 정점에서 시작
2. 먼저 레벨 1의 모든 정점들을 방문 (시작 정점에서 거리가 1인 정점들)
3. 그다음 레벨 2의 모든 정점들을 방문 (시작 정점에서 거리가 2인 정점들)
4. 이런 식으로 레벨을 늘리면서 모든 레벨에 있는 노드들을 방문할 때까지 반복

![BFS](https://github.com/wontae99/wontae99-blog/assets/109476712/a614509b-95cd-4ce1-a2c7-538a1f1fc3b2)

### BFS 구현

BFS는 큐 자료구조를 사용하며, 큐는 한 레벨의 정점들을 저장하는 데 사용된다.

- 시작하는 노드를 입력하는 함수 작성
- 큐를 만들고 시작 노드를 저장 (편의상 큐를 배열로 구현)
- 방문한 노드들을 저장할 배열 생성
- 방문할 노드를 저장할 객체 생성
- 시작노드를 방문한 노드로 표시
- 큐에 무언가 있는 동안 루프 수행
- 해당 정점에 있는 각 인접점에 대해 아직 방문하지 않았다면 방문한 것으로 표시하고 큐에 추가
- 마지막으로 방문한 노드들을 저장한 배열 반환

```javascript
BFS() {
  const queue = [];
  const result = [];
  const visited = {};
  let currentVertex;

  while (queue.length) {
    currentVertex = queue.shift();
    result.push(currentVertex);

    this.adjacencyList[currentVertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    });
  }
  return result;
}
```

DFS에서는 스택을 배열로 구현하였기 때문에 `pop` 메소드를 썼고, BFS에서는 큐를 배열로 구현하였기 때문에 `shift` 메소드를 쓴 점 이외에는 코드가 거의 동일함을 알 수 있다.

다음 포스트에서는 그래프에서 최단 거리 알고리즘 중 하나인 `다익스트라 알고리즘(Dijkstra's Algorithm)`에 대해 알아보자!