---
title: Git 공부하기 (1)
date: '2023-07-09'
tags: ['Git', 'Github']
draft: false
summary: Git 공부하기 - status, init, add, commit, log
---

# 개요

학습 목표:
git의 기능들 재확인 및 추가적인 기능 학습.

### Git 이 뭔데?🧐

`Git` is a free and open source distributed `version control system`. (https://git-scm.com/)

<br />

# Features & Functions

### __git status__

```git
git status
```
working tree의 status를 보여줌

<br />

### __git init__

```git
git init
```

git-init - Create an empty Git repository or reinitialize an existing one

터미널에서 어느 디텍토리에 있든 새 repository를 실체화함. (기본적으로 .git 디렉토리 생성) <br />
프로젝트당 한번씩만 하면 됨. <br /> **`git init` 하기전에 `git status`로 repository가 존재하는지 확인하는 습관을 가지면 좋음!**

<br />

### __git add__

```git
git add file1 file2   (file1, file2 를 staging)
git add .    (디렉토리에 모든 변경된 파일들을 staging)
git add *
```

`git add .`과 `git add *`의 차이점
`git add .`은 `.gitignore`로 무시되는 파일들을 제외하고 모두 stage하지만, `git add *`은 `.gitignore` 무시를 무시하고 모두 올린다. ~~무시무시~~

gitignore 규칙 ➡️ [.gitignore rule](https://wontae99.vercel.app/blog/Git/gitignore)

<br />

### __git commit__

```git
git commit -m "message"
git commit -a -m "message"
```

`git commit -a -m "message"` 는 모든 변경 사항들을 스테이징 함과 동시에 커밋해주는 명령어이다.
__Tip!  ✨Atomic commit✨을 해라!__ <br />
변경된 파일들을 한번에 `add`후 `commit`하기 보다 변경된 __목적, 특징 등에 따라서__ 하나씩 `commit`하는 습관을 들일것!
나중에 변경점들을 rollback하거나 undo해야될때 좀 더 쉬워짐. 또한, 다른 사람들과 협업할때 코드 리뷰하기 용이함.

<br />

### __git log__
```git
git log
git log --oneline
```
`git log`로 Author, 날짜, commit 메시지 등을 확인할 수있음. `git log --oneline`으로 더 짧은 로그로 확인 가능. <kbd>q</kbd> 키를 눌러 exit할 수 있다.

* __log에 뜨는 `(HEAD -> main)`은 무엇일까?__
`HEAD`는 단순히 repository에서 현재 location을 지칭하는 `포인터`이다. 즉, `(HEAD -> main)`는 `HEAD`가 `main` 브랜치를 지칭한다는 뜻이다. 

## Git의 기본적인 workflow

![git-workflow](https://github.com/wontae99/wontae99-blog/assets/109476712/d1213ef0-ebc8-4129-9026-fbe17bd55a0d)

1. Working Directory에서 작업.
2. 작업한 파일들을 `git add`로 Staging시킴.
3. 스테이징된 파일들을 `git commit`으로 repository에 저장.

