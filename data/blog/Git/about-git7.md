---
title: Git 공부하기 (7)
date: '2023-07-17'
tags: ['Git', 'Github']
draft: false
summary: Git 공부하기 7편 - Semantic Versioning, tag
---

# Semantic Versioning

시맨틱 버저닝은 버전 번호를 매기는 일종의 규약, 명세, 규칙이다. 시멘틱 버저닝은 개발자들에게 소프트웨어 출시에 의미를 부여하는 방법을 제공한다.

버전은 보통 세 숫자와, 숫자 사이를 구분시켜주는 점으로 이루어져있다.

![semantic-versioning](https://github.com/wontae99/wontae99-blog/assets/109476712/94b19581-8733-40b8-a7ce-38a9c7a18c57)

__Patch Release__ - 보통 새로운 특징이나 기능 출시를 포함하지 않고, 버그 픽스 같은 코드가 어떻게 사용되는지에 영향을 주지 않는 변화들을 의미.

__Minor Release__ - 새로운 기능이나, 특징이 추가됨을 의미. 해당 패치로 인해 사용자가 바꿔야 하는 건 없다.
마이너 릴리즈가 나오면 Patch Release 번호는 다시 0으로 됨.

__Major Release__ - 중요한 변화들이 있음을 의미. 하위 호환성이 보장되지 않음. 마찬가지로, Minor와 Patch 릴리즈 모두 0으로 돌아감.

## __git tag__

### tag 조회하기

태그는 깃 커밋 히스토리에 존재하는 특정 순간(커밋)을 가리키며 보통 버전 릴리즈를 표시하는데 사용된다.

```git 
$ git tag  // 태그 리스트 보기
$ git tag -l <pattern>
```
`git tag -l` 명령어 뒤에 tag 리스트에서 찾고자 하는 글자를 넣으면 되는데 이때 검색 패턴은 와일드 카드 패턴을 쓴다.
예를 들어 `*beta*`라는 패턴을 입력하면 'beta' 글자를 포함한 모든 tag들을 볼 수 있다. 

+) `git diff <tag1> <tag2>` 명령어로 태그끼리 비교할 수 있다.


### tag 만들기

tag에는 두가지 타입이 있다.

- __Lightweight tag__ : 특정 커밋을 가리키는 이름이나 라벨.
- __Annotated tag__ (주석 태그) : 저자의 정보나 메시지 등을 포함한 __메타데이터__를 포함.

```git
$ git tag <tagname>  // lightweight tag 생성
$ git tag -a <tagname>  // annotated tag 생성
$ git tag <tagname> <commit>  // 이전 커밋에 태그 생성
$ git tag -f <tagname>  // 강제로 태그이름 교체
$ git tag -d <tagname>  // 태그 삭제
```

❗️주의 - tag 이름은 unique 해야됨!

<br/>

__Reference__ 

https://semver.org/
