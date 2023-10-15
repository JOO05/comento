import { S } from "./ui";
import React, { useEffect, useRef, useState } from "react";

const Carousel = () => {
  const img01 = "https://cdn.pixabay.com/photo/2023/09/30/05/06/mallard-8284909_1280.jpg";
  const img02 = "https://cdn.pixabay.com/photo/2023/09/20/20/17/skyline-8265564_1280.jpg";
  const img03 = "https://cdn.pixabay.com/photo/2023/07/30/17/00/spider-web-8159315_1280.jpg";

  const totalSlide = 2; // 슬라이드 갯수 (0,1,2)
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const onClickNext = () => {
    // 마지막 슬라이드까지 가면
    if (currentSlide >= totalSlide) {
      // 첫번째 슬라이드로 이동
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const onClickPrev = () => {
    if (currentSlide === 0) {
      // 마지막 슬라이드로 이동
      setCurrentSlide(totalSlide);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // 페이지가 이동할 때마다 작동
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.SlideContainer ref={slideRef}>
          <S.Img src={img01} alt="" />
          <S.Img src={img02} alt="" />
          <S.Img src={img03} alt="" />
        </S.SlideContainer>
        <S.ButtonWrapper>
          <S.SlideButton onClick={onClickPrev}>Prev</S.SlideButton>
          <S.SlideButton onClick={onClickNext}>Next</S.SlideButton>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
};
export default Carousel;