---
title: Git 공부하기 (5)
date: '2023-07-14'
tags: ['Git', 'Github']
draft: false
summary: Git 공부하기 5편 - remote, push, fetch, pull
---

## __git remote__

```git
git remote  // 리모트 리스트 확인하기 
git remote -v   // 리모트 확인 긴 버전
git remote add <name> <url>  // 리모트 연결
git remote <old> <new>  // 리모트 이름바꾸기
```
`remote`는 `git`으로 연결하는 일종의 __목적지__ 이다.
<br/>
`git remote add origin <url>` 명령어는 `origin`이라는 이름의 `remote`를 입력된 `url`과 연결시켜준다.

## __git push__

remote가 세팅 된 후에 `git push` 명령어로 깃헙에 파일들을 업로드 하는데, 처음 repository 세팅할때 깃헙에서
`git push -u origin master`을 하라고 한다. <br/>
여기서 `-u`는 뭘까? 
`-u`는 upstream의 약자로, `git push -u origin master` 명령어를 실행하면, 깃이 로컬 저장소 마스터 브랜치를 오리진 마스터로 push해준다. <br/>
한번 업스트림을 세팅해주면, `git push` 명령어만 입력하면 자동으로 업스트림 브랜치인 master로 푸쉬가 된다.
<br/>

# __git fetch & git pull__

## __git fetch__

![fetch&pull](https://github.com/wontae99/wontae99-blog/assets/109476712/8ab1b96f-a480-4b37-aaf7-4dcfb69d7780)

위에 그림은 `fetch`와 `pull`의 차이점을 쉽게 설명한 그림이다.

즉, `fetch`는 원격 저장소(깃헙 repo)에서의 변경사항을 로컬 저장소로 가져와서 컴퓨터에서 접근할 수 있게 해준다. 하지만 가져온 변경 사항들이 작업 중인 파일들과 자동으로 합쳐지진 않는다.

예를 들어, 깃헙의 master 브랜치를 `git fetch origin master` 명령어로 `fetch`하면 로컬에 다음과 그림과 같이 `origin/master` 분기가 추가 된다.

![fetch](https://github.com/wontae99/wontae99-blog/assets/109476712/06be784c-95f1-4cf3-901a-bdbd65b602ea)

## __git pull__

`git pull = git fetch + git pull` 이라고 볼 수 있다.

```git
git pull <remote> <branch>
git pull  // 현재 있는 브랜치이름과 동일한 원격 브랜치 pull
```
위 명령어는 내가 현재 위치한 브랜치와 원격 브랜치에서 가져온 변경사항들을 합쳐준다.

예를들어, `git pull origin master`라는 명령어는 origin의 master 브랜치의 정보들을 가져와서 내가 현재 위치한 브랜치와 `merge` 시킨다.

❗️❗️ `pull` 명령어 자체에 병합하는 행위가 있기 때문에 당연하게도, [git 공부하기 3편](https://wontae99.vercel.app/blog/Git/about-git3) 에서 공부했던 `merge conflict`가 발생할 수 있다!