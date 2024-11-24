---
title: react-intersection-observer로 infinite scroll(무한 스크롤) 구현하기
date: '2023-12-02'
tags: ['Next.js']
draft: false
summary: Nextjs 프로젝트에서 react-intersection-observer를 사용하여 infinite scroll 구현하기
---

# DEMO


![infinite-scroll-demo](https://github.com/wontae99/woncha-typescript/assets/109476712/ccb22c44-293e-483c-92c6-2251541d77e7)

https://woncha.vercel.app/movie/trending

<br/>

# react-intersection-observer, 무한 스크롤


__무한 스크롤__ 은 사용자가 스크롤을 내려 화면 하단에 viewport가 도착했을때, api가 호출되어 데이터가 로드되는 방식을 말한다.

➡️ 처음 너무 많은 데이터를 로드하여 렌더링 시간이 길어지는 것을 방지할 수 있다!

__Intersection Observer API__ 는 리엑트 요소가 viewport를 진입했는지, 벗어났는지를 알려준다. 자세한 설명은 아래 README 를 참고하자.

[react-intersection-observer README](https://github.com/thebuilder/react-intersection-observer#readme)


# 적용하기

1. 데이터 패칭 후 컴포넌트로 매핑시키기

다른 여러 방법이 있을 수 있겠지만, 여기서는 __react-intersection-observer__ 의 __useInView__ 훅을 사용해 하단에 entry될 viewport의 section의 ref를 연결하여 __useEffect__ 로 __inView__ 값이 바뀔때마다 데이터 패칭 api를 실행하도록 하였다.

그리고 첫 페이지 값을 2로 시작하여 데이터 패칭이 한번 완료될때마다 page 값을 1씩 늘려 뒤의 컨텐츠들이 차례로 패칭되도록 하였다.

```javascript
export type LoadMoreProps = {
  contentType: "movie" | "tv";
  option: "trending" | "top-rated";
};

let page = 2;

const LoadMore = ({ contentType, option }: LoadMoreProps) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<ContentProps[]>([]);

  useEffect(() => {
    if (inView) {
        // 데이터 패칭
      fetchContents({ contentType, option, page }).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="content-card-grid">
        {data.map((content: ContentData, index) => (
          <ContentCard
            key={content.id}
            content={content}
            contentType="tv"
            index={index}
          />
        ))}
      </section>
      {/* 로딩 스피너  */}
      <section ref={ref} className="flex justify-center items-center w-full">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="66"
          visible={true}
        />
      </section>
    </>
  );
};

export default LoadMore;
```

2. ContentCard 컴포넌트 로드 이펙트 적용

__framer-motion__ 라이브러리를 사용하여 로드된 데이터를 가진 카드 컴포넌트들이 랜더링 될때 차례로 fade-in 되도록 staggered animation을 적용하였다.

우선 __NextJS__ 에서 제공하는 Link 태그를 animate 시키기 위해 다음과 같이 커스텀 컴퍼넌트로 만들어준다

```javascript
const MotionLink = motion(Link);
```

그후 순서대로 fadeIn 되도록 transition 프로퍼티의 delay 값에 데이터의 index * (딜레이 시간) 을 적용하여 stagger 되도록 한다.

```javascript
// ContentCard 컴포넌트
type Props = {
  content: ContentData;
  contentType: "movie" | "tv";
  index: number;
};

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const ContentCard = ({ content, contentType, index }: Props) => {
  const MotionLink = motion(Link);

  return (
    <MotionLink
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.15,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      href={`/${contentType}/${content.id}`}
      className="max-w-sm rounded relative w-[40vh] sm:w-full"
    >
      {/* ///컨텐츠/// */}
    </MotionLink>
  );
};

export default ContentCard;
```

<br />

# 문제점

위의 코드로 무한 스크롤로 데이터 패칭을 하는 것과 stagger animation을 구현할 수 있었지만 한가지 문제점이 있었다 😱

바로 스크롤을 계속 내려 너무 많은 데이터를 로드하려할때, 뒤의 카드 컴포넌트에 fade in 이펙트가 적용될때까지 너무 많은 시간이 소요되었다.

이유인 즉슨, 뒤의 데이터 index 값이 계속 커져서 랜더링 시간보다 fadein 애니메이션이 적용되는 시간이 너무 커지기 때문이다.

<br/>

# 해결방법

데이터 패칭을 무한 스크롤이 적용되는 컴포넌트 안에서 하지않고, 따로 데이터 패칭 후 패칭된 데이터를 매핑하여 카드 컴포넌트를 반환하는 함수를 만들어 viewport가 entry 될때 해당 함수를 실행되도록 하였다.

- 이전

LoadMore 컴포넌트(무한 스크롤 적용될 함수)에서
viewport 안에 있을때 data 패칭

➡️ data를 바로 Card 컴포넌트에 매핑하여 LoadMore에서 반환

➡️ data 길이가 길어져 인덱스 값이 큰 Card에 애니메이션이 늦게 적용

- 이후

LoadMore 컴포넌트에서 데이터 로드 함수 콜백

➡️ 데이터 로드 함수에서 데이터 패칭 후 Card컴포넌트 반환

➡️ 데이터가 페이지 단위로 끊겨 패칭되어 페이지 안의 카드에서 stagger 애니메이션이 적용됨. 

```javascript
// 데이터 패칭 후 카드 컴포넌트로 매핑하여 반환
const loadContentList = async ({
  contentType,
  option,
  page,
}: LoadContentProps) => {
  
  const data = await getTopRatedContents(contentType, page);

  return data.map((content: ContentData, index) => (
    <ContentCard
      key={content.id}
      content={content}
      contentType={contentType}
      index={index}
    />
  ));
};

export default loadContentList;
```

```javascript
// LoadMore 컴포넌트
let page = 2;

const LoadMore = ({ contentType, option }: LoadMoreProps) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (inView) {
        // 데이터 페칭 반환된 카드 컴포넌트들을 useState로 랜더링되게함
      loadContentList({ contentType, option, page }).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="content-card-grid">
        {data}
      </section>
      {/* /// 로딩 스페너 //// */}
    </>
  );
};

export default LoadMore;
```

