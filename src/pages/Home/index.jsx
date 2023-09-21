import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState("")
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      setIsLogin("메인 화면입니다.")
    } else {
      setIsLogin("로그인을 환영합니다.")
    }
  }, []);
  // 로그인 여부에 따라서 다른 문구를 보여준다.
  return (
    <>
      <h1>{isLogin}</h1>
      <button onClick={()=>{navigate("/signin")}}>로그인 페이지로 향하기</button>
      <button onClick={()=>{navigate("/signup")}}>회원가입 페이지로 향하기</button>
    </>
  )
}