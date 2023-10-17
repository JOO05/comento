import { useEffect, useState } from "react";
import _ from "loadsh"
import { useNavigate } from "react-router-dom";

const TAB_LIST = [
  {tabName: '신규', url: 'new'},
  {tabName: '베스트', url: 'best'},
  {tabName: '알뜰쇼핑', url: 'cheap'},
  {tabName: '특가/혜택', url: 'special'}
];

const Tab = (props) => {
  const navigate = useNavigate();
  return (
    <div style={{flexDirection:"row",width:props.minWidth}}  onClick={()=>{navigate(`/${props.tab.url}`); props.handleOnClick(props.index)}}>
      <span style={{color:props.selectedColor}}>
        {props.tab.tabName}
      </span>
    </div>
  );
};


const Header = () => {
  const [minWidth, setMinWidth] = useState(window.innerWidth / TAB_LIST.length)

  useEffect(()=>{
    window.onresize = _.debounce(() => {
      setMinWidth(Math.floor(window.innerWidth /TAB_LIST.length))
     },300)
  },[]) // minWidth가 변경될 때마다 매번 재렌더링 되는 일을 줄이기 위해 debounce 기능을 활용했다.
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const handleOnClick = (index) => {
    setSelectedIndex(index)
  }

  return (
    <header style={{display:"flex"}}>
        {TAB_LIST && TAB_LIST.map((tab,index) => {
          return <Tab key={index} tab={tab} minWidth={minWidth} 
          index={index} selectedColor={index===selectedIndex?"#1bb953":"#000"}
          handleOnClick={handleOnClick} />
        })}
    </header>
  )
};
export default Header;
// map으로 관리하는 div 중에서 하나의 요소만 선택되게 하기 https://www.youtube.com/watch?v=Tef3tmBDM98 참고