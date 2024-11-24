---
title: 자동 넘김 카루젤
date: '2023-10-16'
tags: ['snippet', 'code', 'react']
draft: false
summary: 카루젤 페이지 자동 넘김 컴포넌트
---


```javascript
import { useState, useRef, useEffect } from "react";
import classes from "./carousel.module.css";

const Carousel = ({ children }: { children: React.ReactNode }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
  const carouselBox = useRef(null);
  const [hideScrollBtn, setHideScrollBtn] = useState("");

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  // carousel 인덱스가 처음일때 next 버튼을, 마지막일때 prev 버튼을 disable
  const isDisabled = (direction: "next" | "prev") => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft =
        (carousel.current.offsetWidth - 110) * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
    // carousel 내 길이가 스크린 길이보다 작을 때, 스크롤 버튼 숨김
    carouselBox?.current.scrollWidth - carousel?.current?.scrollWidth > 0
      ? setHideScrollBtn("hidden")
      : setHideScrollBtn("");
  }, []);

  useEffect(() => {
    /// 4초마다 carousel 자동 스크롤
    const interval = setInterval(() => {
      if (!isDisabled("next")) {
        moveNext();
      } else {
        setCurrentIndex(0);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isDisabled("next")]);

  return (
    <div className="carousel my-3 mx-auto" ref={carouselBox}>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          {/* prev 버튼 */}
          <button
            onClick={movePrev}
            className={`hover:bg-#f1f5f9 text-white w-10 h-full text-center opacity-75 hover:opacity-100 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300 ${
              isDisabled("prev") ? "" : classes["bounce-left"]
            } ${hideScrollBtn}`}
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          {/* next 버튼 */}
          <button
            onClick={moveNext}
            className={`hover:bg-#f1f5f9 text-white w-10 h-full text-center opacity-75 hover:opacity-100 focus:outline-none disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300 ${
              isDisabled("next") ? "" : classes["bounce-right"]
            } ${hideScrollBtn}`}
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        {/* 카루젤 아이템 */}
        <div
          ref={carousel}
          className="carousel-container relative flex gap-2 overflow-hidden scroll-smooth snap-x snap-mandatory touch-auto z-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

```