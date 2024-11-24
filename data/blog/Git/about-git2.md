---
title: Git 공부하기 (2)
date: '2023-07-09'
tags: ['Git', 'Github']
draft: false
summary: Git 공부하기 2편 - branch, switch, checkout
---

가령, 대형 프로젝트 진행하고 있다고 가정하자. <br />
첫번째로, 웹사이트 컬러 scheme 바리에이션으로 샘플을 적용하고싶을때. <br />
두번째로, 매우매우매우 복잡한 버그가 있어서 수정을 거듭해야 되는 작업을 할때. <br/>
세번째로, 다른 개발자가 만든 기능들을 추가해서 실험하고 싶을때.

어떻게 해야할까?🤯

`branch`를 활용하면 된다.

## **git branch**

```git
git branch    //  branch 리스트 보여줌
git branch <name>  // name branch 생성
```
브랜치 삭제:
`git branch -d <name>`, `git branch -D <name>` 차이점은? <br />
`git branch -D <name>` 은 강제적으로 브랜치 삭제가 가능하고, `git branch -d <name>`은 브랜치 삭제전에 `merge`가 이루어져야 한다. <br/>
`git branch -m <name>` 현재 위치하는 브랜치의 이름을 `name`으로 바꿈

## **git switch**

```git
git switch <name>  // "name" 브랜치로 이동
git switch -c <name>
```

원래는 `git checkout`명령어를 썼었는데 비교적 최근 `git switch`명령어가 추가됨. <br/>
`git switch -c <name>`로 `name` 브랜치를 생성함과 동시에 이동

## **git checkout**

```git checkout <name>  // "name" 브랜치로 이동
git checkout -b <name>
```

`git checkout -b <name>`은 `git switch -c <name>` 과 같은 기능 수행.

**✨Tip. 변경사항을 만들때마다 브랜치 이동 전에 항상 등록하고 커밋하는 습관 가질것!✨** <br/>

```
Please commit your chages or stash them before you switch branches
```
그렇지않으면 변경사항이 있는 채로 브랜치를 이동하려 할때 위와 같은 메시지가 뜸.
(`stash`로 해결 가능)


다음 편에서는 `merge` 방법에 대해 학습해보자!