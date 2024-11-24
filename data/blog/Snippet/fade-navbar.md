---
title: scroll 이벤트로 nav바 fade-in/out 적용
date: '2023-10-14'
tags: ['snippet', 'code', 'react']
draft: false
summary: make nav bar fade in/out when scrolling up/down
---

# React에서 Scroll 이벤트로 NavBar Fade In/Out 적용하기

편의를 위해 `tailwind css`를 사용하였지만 코드를 살짝 바꾸면 일반적인 `css`나 `styled-component` 사용시에도 적용이 가능하다

```javascript
/// navbar component
export default function NavBar() {
  ///
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNav = () => {
    if (typeof window === undefined) return
    // 스크롤을 올릴때 새로운 scrollY값이 이전에 저장한 값보다 커짐
    // -> nav bar를 보이게함
    if (lastScrollY > window.scrollY) {
      setShowNav(true)
    } else {
      // 스크롤을 내릴때 새로운 scrollY값이 이전에 저장한 값보다 작아짐
      // -> nav bar를 보이지 않게함
      setShowNav(false)
    }
    // 다음 무브에서 사용할 페이지 위치를 저장
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('scroll', controlNav)
      // cleanup
      return () => {
        window.removeEventListener('scroll', controlNav)
      }
    }
  }, [lastScrollY])

// opacity 외에 top 값을 바꿔서 navbar가 들락날락하게 설정할 수 있다.
  return <nav className={`${showNav ? 'opacity-100' : 'opacity-0'}`}>...</nav>
}
```

<br/><br/>

## 결과

`css` transition을 추가하여 부드럽게 전환하도록 하였다!

![nav-bar-scroll-event](https://github.com/wontae99/wontae99-blog/assets/109476712/b9caedc4-6ed0-4ba6-857f-e8fffbf51db7)
