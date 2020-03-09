import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

/**
 * @file Private Component
 * @function Private
 * @param {object} this.props.childre
 * @external useEffct
 * @external Router
 * @requires isAuth
 * @returns {html}
 * @summary If a user is not signed in redirects the user to the sign in page.
 * @author Amen Ra
 */
const Private = ({ children }) => {
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
   * @summary This fires when the compoenent is mounted and rredirects the user
   * to the sign in page if they are not authenticated\
   */
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Private;
