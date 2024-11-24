---
title: ABOUT SEO
date: '2023-07-26'
tags: ['SEO']
draft: false
summary: RESTful API 정의
---

# SEO란?

Search Engine Optimization의 약자로 검색엔진 최적화를 의미한다. SEO의 목표는 검색엔진 결과에서 검색 순위를 높이는 전략을 세우는데 있다.

이때 검색 엔진 시스템은 크게 4가지 작업을 한다.

1. 크롤링(Crawling)
2. 인덱싱(Indexing) - 크롤링 단계에서 모인 데이터들을 저장할 공간을 찾음
3. 랜더링(Rendering) - 자바스크립트와 같이 페이지에 존재하는 리소스들을 실행함. 크롤링된 모든 페이지에서 발생하지는 않으며, 인덱싱되기 전에 실행되기도 한다.
4. 랭킹(Ranking) - 사용자의 입력에 기반하여 관련된 결과 페이지를 가공하기위해 데이터를 요청함.

## Web Crawler

웹사이트가 구글, 네이버 등의 사이트에서 검색 결과로 뜨기위해서, 웹사이트와 그 안의 웹 페이지들을 발견하기위해 웹 크롤러를 사용한다.

각 검색 엔진들마다 가이드라인이 다르기 때문에 Ranking이나 Rendering에 관해서 차이가 있을 수 있지만 Crawling과 Indexing에서는 대부분의 검색엔들이 매우 유사하게 작동한다.

웹 크롤러들은 사용자들을 흉내낸 일종의 봇으로 웹 페이지들을 인덱싱하기위해 링크들을 타고 웹사이트를 navigate한다. 구글은 몇가지 웹 크롤러를 가지고 있는데, 대표적으로 Googlebot Desktop과 Googlebot Smartphone이 있다.

## 구글봇 작동원리

![crawler](https://nextjs.org/_next/image?url=%2Fstatic%2Fimages%2Flearn%2Fseo%2Fgooglebot.png&w=1920&q=75&dpl=dpl_CyRkgy8gKeDjQwgHnpS9vQ4HCtCD)

1. URL 찾기: Google Search Console이나 웹사이트들 사이 링크 또는 XML 사이트맵 등에서 URL을 얻음.

2. Crawl 큐에 추가하기: 구글봇이 처리할 Crawl 큐에 URL 추가. Crawl 큐에 추가된 URL들은 보통 수 초에서 경우에 따라(페이지가 랜더링 또는 인덱싱이 필요할 경우) 수일까지 남아 있는다. 그 다음 Render 큐에 들어가게 된다.

3. HTTP 요청: Crawler가 헤더를 받기위해 HTTP 요청을 만들고 돌아온 상태코드에 따라 행동한다.

```
200 - it crawls and parses the HTML.
30X - it follows the redirects.
40X - it will note the error and not load the HTML
50X - it may come back later to check if the status code has changed.
```

4. Render 큐: 다른 서비스들과 검색 시스템의 컴포넌츠들이 HTML을 처리하고 컨텐츠들을 파싱한다. 만약 페이지가 자바스크립트 Client-Side 컨텐츠를 포함하고 있을때, URL은 Render 큐에 추가될 수 있다. Render 큐는 자바스크립트를 render할때 더 많은 리소스들이 필요하기때문에 구글에 더 부담이 크다.

5. 인덱싱 준비 - 위의 모든 조건들이 충족되면 인덱싱되어 검색 결과에 노출될 준비가 된다.

# 웹 크롤링 등록하기

네이버와 구글 두 검색 엔진에 사이트를 등록해보았다.

- [Naver Search Advisor](https://searchadvisor.naver.com/)

- [Google Search Console](https://search.google.com/search-console/about?hl=ko)

네이버는 7/19일 등록하여 7/26일 기준으로 검색 결과로 떠있는 것을 확인할 수 있다.

![네이버검색](https://github.com/wontae99/nextjs-movie-project/assets/109476712/7643b4f3-0845-4acf-bf0d-958e9a4ecc56)

구글은 아직인거 같다... (검색해보니까 길게는 한달정도 걸릴 수 있다고 한다)

<br/>

# Reference

- [GOOGLE-SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=ko)
- [NEXTJS-SEO](https://nextjs.org/learn/seo)
