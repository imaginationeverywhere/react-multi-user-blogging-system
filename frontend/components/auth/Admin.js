import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

/**
 * @file React Admin Dashboard Component
 * @function Admin
 * @param {*} this.props.children
 * @method isAuth
 * @method useEffect
 * @returns {html}
 * @summary Renders Admin Dashboard Component
 */
const Admin = ({ children }) => {
  /**
   * @external useEffect
   * @fires isAuth
   * @fires Router.push
   * @returns {void}
   * @description Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   * @version — 16.8.0
   * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   * @summary This fires when this component is mounted and will rredirect user to the Admin Dashboard once they are signed in if not they
   * are redirected to the sign in page.
   */
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
