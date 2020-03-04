import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

/**
 * @file React Admin Dashboard Component
 * @function Admin
 * @param {*} this.props.children
 * @method isAuth
 * @method useEffect
 * @returns {Admin} html and css for Admin Dashboard Component
 */
const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role !== 1) {
      Router.push("/");
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Admin;
