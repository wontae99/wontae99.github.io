---
title: Git 공부하기 (6)
date: '2023-07-16'
tags: ['Git', 'Github']
draft: false
summary: Git 공부하기 6편 - collaboration, fork & clone, rebase
---

## __Pull Request (PR)__

`Pull Request`는 새로운 작업을 브랜치에 올렸을때 팀원이나 공동 작업자들에게 검토를 요청하고 merge 또는 반려해달라고 요청하는 장치이다. 또한 해당 커밋에 대해 피드백을 받을 수 있다.

# 협업 워크플로우

1. 프로젝트 repo 포킹하기.
2. 포킹한 것을 cloning하여 내 로컬 기기로 가져오기.
3. 프로젝트 repo에 remote 생성 (보통 `upstream`이라고 이름 지음)
4. 내 feature 브랜치에 작업한 것들 add/commit.
5. 포크한 repo에 새로운 feature 브랜치 생성하여 push (보통 `origin`이라고 함)
6. 프로젝트 repo에 PR 열기.

## __git rebase__

`git rebase`를 사용하는 경우는 크게 두가지가 있다

1. 병합의 또다른 방법
2. cleanup tool 로써의 방법 (커밋 히스토리)

### rebase로 병합하기

`merge`로 병합하는 방법과 `rebase`로 병합하는 방법의 가장 큰 차이점은 __커밋 히스토리__ 이다. `merge`의 경우 에는 병합하는 과정에서 merge commit이 발생하므로, 큰 프로젝트들의 경우 커밋 히스토리가 지저분해 질 수 있다. 반면, `rebase`의 경우 말 그대로 base를 새롭게 만들어, 커밋 히스토리도 새로 만들게 된다.

아래는 master 브랜치와 feature 브랜치를 `rebase`로 병합하는 예이다.

```git
git switch feature
git rebase master
```

![rebase](https://github.com/wontae99/wontae99-blog/assets/109476712/c00bfaf9-82f0-490b-827c-51257bd88746)

이 그림처럼 `git rebase master` 명령어는 마스터 브랜치의 끝을 베이스로 feature 브랜치의 시작점으로 삼아 커밋을 생성한다.

### Interactive Rebase

```git
$ git rebase -i HEAD~<num>
```
`git rebase -i` 명령어는 interactive mode를 의미하는데, interactive 모드로 커밋을 삭제/편집 할 수 있고, 파일을 추가할 수도 있다. `git rebase -i HEAD~<num>` 명령어는 다른 브랜치로 리베이스 하는 것이 아니라, 현재 위치한 HEAD로 커밋들을 리베이스 한다.

각 회사나 개발자들마다 협업 가이드 라인이 존재하는데, 커밋 메시지 등의 가이드 라인을 준수하지 못하여 편집, 삭제할때 이 명령어를 사용하면 된다.

어떻게 쓰는데?

`git rebase -i` 명령어를 터미널에 입력하면, 다음과 같이 커밋 리스트가 작성된 text-editor가 열린다.

![rebase-i](https://github.com/wontae99/wontae99-blog/assets/109476712/a1549828-c491-4c20-9e98-fd9c449ffc62)

이때 커밋들을 내가 원하는데로 편집하면 된다. 일반적으로 많이 쓰는 커맨드들은 다음과 같다.

- `pick` - 커밋을 그대로 사용
- `reword` - 커밋 메시지를 편집
- `edit` - 커밋 내용 편집
- `fixup` - 커밋 컨텐츠는 유지, 직전 커밋과 합쳐짐. 해당 커밋 메시지는 삭제됨.
- `drop` - 커밋 삭제


__fixup 예시__

```git
// git-rebase-todo

pick 3213ere add navbar
fixup 2314ewr edit typo in navbar
``` 
<center>⬇️</center>

```git
// commit log
23e1223 add navbar
```
<br />

# __리베이스의 위험성__

커밋 히스토리도 깔끔하게되는데 병합할때 `rebase`가 더 좋은거 아님? 이렇게 생각하게 될 수 있다.
하지만 협업을 하는 상황에서, __이미 깃헙에 push가 된 커밋들을__ rebase하게 되면 다른 사람들과 커밋 히스토리들이 꼬이게 된다. 

💥결론:  __이미 공유한 커밋을 리베이스 하지 마라!!__
