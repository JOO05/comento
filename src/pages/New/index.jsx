import axios from 'axios'
import { useState, useEffect, useRef } from 'react';
import {Card, Row, Col} from 'react-bootstrap'

const New = () => {
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const elementRef = useRef(null)

  function onIntersection(entries){
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore){
      fetchMoreItems()
    }
  }

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
    const data = await axios(`https://dummyjson.com/products`)
    if (data.data.products.length===0){
      setHasMore(false)
    } else {
      setProducts(prevProducts => [...prevProducts,...data.data.products])
      setPage(prevPage=>prevPage+1)
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