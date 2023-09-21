import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import axios from "axios";

const schema = yup.object({
  email: yup.string().email("이메일 형식 아님").required("이메일 입력하기"),
  password: yup.string().required("비밀번호 입력하기"),
  passwordCheck: yup.string().required("비밀번호 확인 입력하기")
})
// 입력 요소 범위 설정 가능한 yup

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({ resolver: yupResolver(schema), mode: "onChange" })
  // 조건에 맞지 않을 시에 formState로 경고 메세지 설정 가능

  const onClickSubmit = async (data) => {
    if (data.password === data.passwordCheck) {
      // 비밀번호와 비밀번호 확인이 일치할 경우에만 axios
      try {
        await axios.post("https://vercel-express-pied-kappa.vercel.app/users/signup", {...data});
        alert("회원가입에 성공하셨습니다.");
        navigate("/signin")
      } catch (error) {
        alert(error.response.data);
      }
    } else {
      alert("비밀번호와 비밀번호 확인란의 내용이 일치하지 않습니다.")
    }
  }
  return (
    <>
    <h1>Sign Up</h1>
    <form onSubmit={handleSubmit(onClickSubmit)}>
      이메일: <input type='text' {...register("email")} /><br />
      <p className="text-red-500">{formState.errors.email?.message}</p>
      비밀번호: <input type='text' {...register("password")}  /><br />
      <p className="text-red-500">{formState.errors.password?.message}</p>
      비민번호 확인: <input type='text' {...register("passwordCheck")}  /><br />
      <p className="text-red-500">{formState.errors.passwordCheck?.message}</p>
      <button>회원가입 요청하기</button>
    </form>
    <button onClick={()=>{navigate("/signin")}}>로그인 페이지로 향하기</button>
    </>
  )
}