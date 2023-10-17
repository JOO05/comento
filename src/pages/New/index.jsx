import { useState, useEffect, useRef } from 'react';
import { Card, Row, Col } from 'react-bootstrap'
// https://dummyjson.com/docs/products 의 데이터 활용

const New = (props) => {
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const elementRef = useRef(null)

  function onIntersection(entries){
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore){
      fetchMoreItems()
    }
  }
  // entries는 Intersection Observer API를 통해 관찰한 요소의 정보를 포함하는 배열
  // Intersection Observer는 여러 요소의 상태를 추적할 수 있으므로, 이 코드는 첫 번째 요소의 정보를 가져옴

  useEffect(()=>{
    const observer = new IntersectionObserver(onIntersection)
    if (observer && elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => {
      if (observer){
        observer.disconnect()
      }
    }
  },[products])

  async function fetchMoreItems() {
    if (props.data.length===0){
      setHasMore(false)
      // 받아올 데이터가 없을 시에는 boolean 값 변경
    } else {
      setProducts(prevProducts => [...prevProducts,...props.data])
      // 이전에 있었던 제품과 스크롤을 내리며 새롭게 받아오는 제품들로 products 목록 재생성, 배열 복사 시에 ...을 사용해야지 useState 인식
    }
  }

  return (
    <>
      {products.map((item,index)=>
          <Card key={index} style={{width:"600px", margin:"0 auto"}} className={'mb-2'}>
            <Row>
              <Col md={4}>
                <img src={item.thumbnail} alt='Product Image' style={{width:"100%",margin:"10px"}} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Text>
                    {item.description}
                  </Card.Text>
                  <Card.Text>
                    $ {item.price}
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>)}
      {hasMore &&
        <div ref={elementRef} style={{textAlign:"center"}}>Load More Items...</div>}
    </>
  )
};
export default New;

// 참고 영상: https://www.youtube.com/watch?v=WFw_SgVlXUY&t=857s
// 영어 설명을 완벽히 이해하기 어려워서 해당 내용을 클론코딩 후 각 코드에 대한 설명 추가