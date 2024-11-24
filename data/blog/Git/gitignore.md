---
title: .gitignore 규칙
date: '2023-07-09'
tags: ['Git', 'Github', 'gitignore']
draft: false
---

# .gitignore rule

```
# : 주석 
    # 이 줄은 적용되지 않는다.

* : 와일드 카드
    *.txt : txt파일은 모두 무시

! : 무시를 무시 (🌈반사)
    !go.txt : *.txt로 txt 파일은 무시하기로 했지만, 이 규칙을 무시하고 go.txt는 staged에 올린다.

/ : path 표시
    /module : 루트 디렉터리 아래 /module 파일을 무시. 그러나, user/module은 무시되지 않는다.
    js/ : js 디렉토리 아래 모든 파일 무시
    css/*.txt : css 디렉토리 아래 확장자가 txt를 모두 무시 

```