import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>404 NotFound</h2>
      <button onClick={() => navigate("/")}>Go Home</button>
    </>
  );
};
export default NotFound404;
