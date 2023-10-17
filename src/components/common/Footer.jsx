import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return <footer onClick={()=>navigate("/")}>쇼핑몰 만들기 과제</footer>;
};

export default Footer;
