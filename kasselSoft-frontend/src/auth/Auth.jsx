/* eslint-disable react/prop-types */
import { useContext } from "react";
import { When } from "react-if";
import { LoginContext } from "../context/AuthProvider";
// import { useNavigate } from "react-router-dom";

const Auth = (props) => {
  const { loggedIn } = useContext(LoginContext);
  // const navigate = useNavigate();

  // console.log(loggedIn);
  // useEffect(() => {
  //   if (!loggedIn) {
  //     navigate("/");
  //   }
  // }, []);

  return <When condition={loggedIn}>{props.children}</When>;
};

export default Auth;
