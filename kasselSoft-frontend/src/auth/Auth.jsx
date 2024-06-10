/* eslint-disable react/prop-types */
import { When } from "react-if";

const Auth = (props) => {
  return <When condition={true}>{props.children}</When>;
};

export default Auth;
