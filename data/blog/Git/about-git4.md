---
title: Git 공부하기 (4)
date: '2023-07-13'
tags: ['Git', 'Github']
draft: false
summary: Git 공부하기 4편 - diff, stash, checkout, restore, reset
---

## **git diff**

```git
git diff
```

커밋이나 브랜치, 파일, working directory 등에서 변화를 볼때 사용. `git diff` 명령어는 다음 커밋을 위해 스테이지에 **등록되지 않은(unstaged)** 워킹 디렉토리의 변경사항들을 나열함. <br/>
`git diff --staged` <br/>
`git diff --staged <filename>` 스테이지된 특정 파일내에서 변경점을 보여줌. <br/>
`git diff HEAD` 워킹 트리에서 마지막 커밋 이후 변경점들을 보여줌. <br/>
`git diff branch1..branch2` 두 브랜치 사이의 변경점을 보여줌.

## **git stash**

```git
basic usage
$ git stash
$ git stash pop

여러 스태쉬 관리
$ git stash list
$ git stash drop <stashid>
$ git stash clear
```

특정 브랜치에서 작업을 하다가 커밋을 하지않고 다른 브랜치로 옮겨서 다른 작업을 해야할 때 `stash` 명령어를 쓰면 유용하다. `git stash`를 실행하면 커밋되지않은 모든 변경 사항들을 기억했다가 나중에 다시 그 작업으로 돌아갈 수 있게 해준다. <br/><br/>
다른 브랜치에서의 작업을 끝내고 이전 브랜치에서의 작업을 이어가고자 하면 `git stash pop`명령어를 입력하자.
<br/>
`git stash apply` 명령어는 `git stash pop`과 비슷한데 차이점은 `git stash apply`는 변경사항을 적용후에 stash에서 삭제되지 않고 남음. 여러개의 브랜치에 변경사항을 적용하고 싶을때 사용함.

## __git checkout__

```git
$ git checkout <commit-hash>
```
`git checkout` 명령어는 다른 브랜치로 이동하는 것 뿐만 아니라 이전 커밋을 볼 수 있는데, 이때 `commit`은 `git log` 명령어로 첫 7자리 `commit-hash`를 참조하면 된다. <br/>

해당 명령어를 입력하면 다음과 같은 메시지가 나타난다.
<br/>

```
You are in 'detached HEAD' state. You can
look around, make experimental changes and
commit them, and you can discard any commits
you make in this state without impacting any
branches by switching back to a branch.
```
__detached HEAD__ 가 뭘까? 🤯

보통 HEAD는 현재 브랜치를 가리키는 포인터이고, 브랜치는 마지막 커밋을 가리키는 포인터이다. 즉, HEAD가 브랜치를 브랜치가 커밋을 가리키게된다.

하지만 우리가 특정 커밋을 `checkout`하게 되면 HEAD가 브랜치가 아닌 커밋을 가리키게된다. 이때 HEAD와 브랜치가 분리된 __detached HEAD__ 상태가 되는 거다. 🤯

그렇다면 detached HEAD상태에서 뭘 할 수 있을까?

1. detached HEAD상태의 커밋의 내용물? 컨텐츠?들을 다시 볼 수 있음
2. 원래 있던 브랜치로 돌아가 HEAD와 브랜치 다시 연결 가능
3. `checkout`한 커밋에서 새로운 분기를 생성 후 그 커밋 시점을 이어서 작업 가능.


```
$ git checkout HEAD~1
```
HEAD기준 이전 커밋으로 돌아감.

```git
$ git checkout HEAD <file>
$ git checkout -- <file>
```
한 파일에서 이전 커밋으로 돌아감. (`git restore`로 동일한 명령 가능)

## __git restore__

```git
$ git restore <filename>
```

한 파일에서 이전 커밋으로 돌아감.

```git
$ git restore --staged <file-name>
```
실수로 `git add` 명령어로 변경사항을 등록(stage)하였을때 사용. unstage시킴.

<br/>

## __git reset__

```git
$ git reset <commit-hash>
```
특정 커밋 시점으로 되돌리고싶을때 사용

변경 사항은 working directory에 남아있기 때문에 다른 브랜치에 실수로 커밋을 했을때 사용하면 유용함!

`git reset --hard <commit>` 명령어는 working directory에 변경 사항도 제거됨.

## __git revert__

```git
$ git revert <commit-hash>
```
`revert`는 되돌린다는 점에서 `reset` 명령어와 비슷하지만, 조금 다르게 작동한다.

`reset`은 커밋을 없애면서 브랜치 포인터를 뒤로 되돌리는데,

`revert`는 변경 사항들을 실행 취소하는 새로운 커밋을 만든다. 그러므로 새로운 커밋 메시지가 필요하다.

만약 협업을 하는 상황에서 `reset`을 쓰게 되면 다른 기기에서도 이전 커밋들이 삭제되기 때문에, `reset`보다는 `revert`를 사용하는게 👍

물론, 해당 커밋을 나만 가지고 있고 아직 공유하지 않은 상황이라면 `reset`해도 👌