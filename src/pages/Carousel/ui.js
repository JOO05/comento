import styled from 'styled-components';

export const S = {
  // 슬라이드에 들어갈 이미지
  Img: styled.img`
    width: 500px;
    height: 500px;
  `,
  Wrapper: styled.div`
    padding: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  Container: styled.div`
    width: 500px;
    height: 1000px;
    overflow: hidden;
  `,
  SlideContainer: styled.div`
    display: flex;
  `,
  ButtonWrapper: styled.div`
    margin-top: 50px;
    width: 500px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  `,
  SlideButton: styled.div`
  width: 80px;
  padding: 20px;
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  :hover {
    background-color: yellow;
    color: #000;
  }
  `,
}