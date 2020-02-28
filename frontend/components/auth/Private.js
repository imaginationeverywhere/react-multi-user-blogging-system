import { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../actions/auth";

/**
 * @file Private Component
 * @function Private
 * @param {*} this.props.childre
 * @returns {Private} Renders Private component html and css
 * @author Amen Ra
 */
const Private = ({ children }) => {
  /**
   * @method useEffect
   * @method isAuth
   * @method Router.push
   * @summary Rredirect user to the sign in page if they are not authenticated
   * {@link https://reactjs.org/docs/hooks-effect.html React}
   */
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Private;
