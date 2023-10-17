import { useEffect, useState } from "react";
import _ from "loadsh"
import { useNavigate } from "react-router-dom";

const TAB_LIST = [
  {tabName: '신규', url: 'new',isChecked:false},
  {tabName: '베스트', url: 'best',isChecked:false},
  {tabName: '알뜰쇼핑', url: 'cheap',isChecked:false},
  {tabName: '특가/혜택', url: 'special',isChecked:false}
];

const Tab = (props) => {
  const navigate = useNavigate();

  return (
    <div style={{flexDirection:"row",width:props.minWidth}}>
      <span onClick={()=>{navigate(`/${props.tab.url}`);}}
      style={{fontWeight:props.tab.isChecked?"700":"400"}}>
        {props.tab.tabName}
      </span>
    </div>
  );
};


const Header = () => {
  const [minWidth, setMinWidth] = useState(window.innerWidth / TAB_LIST.length)
  const newTab = [...TAB_LIST]
  const [category,setCategory] = useState(newTab);
  const [, setChoiceTagID] = useState(1);
  const [clickValue, setClickValue] = useState(false);

  useEffect(()=>{
    window.onresize = _.debounce(() => {
      setMinWidth(Math.floor(window.innerWidth / category.length))
     },500)
  },[category.length, minWidth])
  // minWidth가 변경될 때마다 매번 재렌더링 되는 일을 줄이기 위해 debounce 기능을 활용했다.
  

  const clickTagBtn = (id) => {
    setCategory(TAB_LIST)
    // 버튼 중 하나의 요소만 클릭되게 만들고 싶은데 제대로 작동하지 않는다. 방법 찾아서 시도해봤는데 구현이 안되는 상태다.
    // isChecked가 모두 false 값인 상태로 초기화하고 선택한 페이지의 하나의 isChecked 값만 true로 바꾸고 싶다.
    // ex) 뉴 페이지에서 베스트 페이지 클릭 시 베스트 페이지의 폰트가 굵어지고 뉴 페이지는 옅어지는 것
    setChoiceTagID(id);
    setClickValue(!clickValue);
    category[id].isChecked = !clickValue;
    console.log(category)
  };
 
  return (
    <header style={{display:"flex"}}>
        {category && category.map((tab,index) => {
          return <Tab key={index} tab={tab} minWidth={minWidth} clickTagBtn={clickTagBtn} index={index} />
        })}
    </header>
  )
};
export default Header;