import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ mode: "onChange" })
  const onClickSubmit = async (data) => {
    // ...data는 배열을 복사하는 방법
    try {
      await axios
        .post("https://vercel-express-pied-kappa.vercel.app/users/signin", {...data})
        .then((response) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          localStorage.clear()
          // 새로운 토큰으로 대체
          localStorage.setItem('token', response.data.token)
          alert(response.data.message)
          navigate("/")
        })
        .catch((e) => {
          console.log(e.response.data);
        });
    } catch (error) {
      alert(error.response.data);
    }
  }
  return (
    <>
    <h1>Sign In</h1>
    <form onSubmit={handleSubmit(onClickSubmit)}>
      이메일: <input type='text' {...register("email")} /><br />
      비밀번호: <input type='text' {...register("password")}  /><br />
      <button>로그인 요청하기</button>
    </form>
    <button onClick={()=>{navigate("/signup")}}>로그인 페이지로 향하기</button>
    </>
  )
}