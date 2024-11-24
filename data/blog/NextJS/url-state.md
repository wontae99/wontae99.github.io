---
title: URL에 state 추가하기
date: '2023-10-15'
tags: ['Next.js']
draft: false
summary: useState 대신 useSearchParams 활용하여 URL query를 추가하자
---

# 서론

구글에 예를 들어, react router 이라는 검색어를 검색하면 `search?q=react+router&oq=react+router` 이런식으로 주소창 뒤에 `query`가 나오는 것을 볼 수 있다. 이런식으로 query를 생성하는 이유가 무엇일까?

url에 state를 유지함으로써 얻을 수 있는 장점들은 다음과 같다.

- 유저들이 url을 공유하거나 저장할 때, 즉각적으로 해당 url로부터 같은 UI를 얻을 수 있다.
- 이전 UI를 보기위해 <kbd>backspace</kbd> 버튼을 사용할 수 있다.
- 유저가 새로고침을 하더라도 같은 UI 페이지를 유지할 수 있다.
- 검색 엔진 최적화(SEO) - 구조화된 state 데이터를 가진 URL은 SEO를 향상시킬 수 있다.
- `useState`를 사용하여 state를 제어할 때 client component에 제약되지만, URL에 state를 둔다면 server component로 유지할 수 있다.

<br/>

## useState, useEffect를 사용하여 URL을 동기화하는 방법

예를 들어, 옷의 색과 사이즈를 state로 제어하는 쇼핑몰 웹 페이지가 있다고 하자. `useState`를 이용한 코드는 다음과 같을 것이다.

```javascript
export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('md')
}
```

`window.history.pushState` 메소드를 사용하여 url을 설정할 수 있지만, `NextJS`를 사용한다면 다음과 같이 `useRouter`메소드를 사용하여 url를 푸시해줄 수 있다.

```javascript
useEffect(() => {
    router.push(`?color=${selectedColor}&size=${selectedSize}`, {
    // 해당 링크로 이동하였을때, 자동으로 top으로 스크롤하는 것을 방지
    scroll: false,
  }),
}, [selectedColor, selectedSize, router])
```

**하지만❗️** 이 방법에도 문제가 있다. 위에 방법으로는 단순히 url을 push해주는 것이기 때문에, 이전 ui를 보기위해 <kbd>backspace</kbd>를 눌러도 url만 바뀔뿐 이전 ui를 불러 오지 못한다.

이유인 즉슨, 아직 url의 data를 ui와 연결시키지 않았기 때문이다. url 데이터 즉, `query string`을 읽는 방법으로 네이티브 브라우저에서 제공하는 `window.location.search` 메소드를 사용할 수 있지만

`NextJS`에서는 `useSearchParams`를 사용하면된다.

<br/>

# useSearchParams 사용하여 URL 동기화하기

위에서 알 수 있듯이 `useState`를 사용한다면, 각 `query string`마다 state를 제어해야 하기때문에, 코드가 지저분해 질 수 있다.

때문에 다음과 같이 `useSearchParams` 메소드로 쿼리를 한번에 불러오는 것이 효과적이다.

```javascript
export default function ProductPage() {
  const searchParams = useSearchParams()
  const selectedColor = searchParams.get('color')
  const selectedSize = searchParams.get('size')

    // useState에서 button onClick에 router.push를 사용했던것 대신, nextJS의 Link를 활용하여 url을 업데이트해줌
  return ...
  {colorVariants.map((color) => <Link 
  href={`?color=${color}&size=${selectedSize}`}>{color}
  </Link>)}...
}
```

그렇다면 client 컴포넌트가 아닌 서버 컴포넌트에서는 어떨까?

서버 컴포넌트에서는 다음과 같이 `useSearchParams`를 단순히 `prop`으로 받아서 사용하면 된다.

또 다른 점으로는, `get`메소드를 사용하는 대신, `prop`으로 받은 `search param` object에서의 프로퍼티 자체를 받아오면 된다.

```javascript
export default function ProductPage({ searchParams }) {
  const selectedColor = searchParams.color
  const selectedSize = searchParams.size
}
```

<br/>

# 그외에 주의할 점

- url validate / default url value

사람들이 url의 query를 바꿔 입력하고, 그에 맞는 data가 없을 경우를 대비하여 `validate`를 추가하거나 default 값을 설정하는 것이 중요하다.

예를 들어, `color` 쿼리에 없는 색상인 `purple`을 입력하였을때를 대비해

```javascript
const selectedColor = searchParams.color || 'black'
```

위에처럼 설정해 default 값을 두는 것이 좋다.

- url-encoded values

URL은 항상 `string` 타입이다. 하지만, 입력된 state에 `#, :` 등과 같은 특수 문자들이 있을 수 있다. 그런 경우 `URL-encode`가 필요하다.

예를 들어, 위에서 `colorVariant` 배열에 `black:fall` 과 같이 특수 문자를 포함할때, 에러가 발생한다.

이러한 경우를 대비하여 `URLSearchParams` 함수에 

```javascript
// url을 업데이트하는 더 안전한 방법
...
{colorVariants.map((color) => <Link 
href={`?${new URLSearchParams({
    color,
    size: selectedSize
})}`}>{color}
  </Link>)}
...
```


<br/>

## Reference

https://youtu.be/ukpgxEemXsk?si=kuNGiMBxKiuXnjOr

https://nextjs.org/docs/app/api-reference/functions/use-search-params