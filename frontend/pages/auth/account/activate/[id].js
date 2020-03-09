import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { signup } from "../../../../actions/auth";

/**
 * @function ActivateAccount
 * @param {props} props
 * @param {object} props.router
 * @external jwt
 * @external useState
 * @external withRouter
 * @requires Layout
 * @requires signup
 * @returns {html}
 * @summary Renders the Account Activation page when a user creates
 * an account an activation link is sent to their email
 * {@link http(s)://baseUrl:3085/auth/account/activate/[id]}
 */
const ActivateAccount = ({ router }) => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    showButton: true
  });

  /**
   * @constant {object} values
   * @type {boolean} @var showButton
   * @type {string} @var name
   * @type {string} @var token
   * @type {string} @var error
   * @type {boolean} @var loading
   * @type {boolean} @var success
   */
  const { name, token, error, loading, success, showButton } = values;

  /**
   * @external useEffect
   * @external jwt
   * @fires setValues
   * @returns {void}
   * @description Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   * @version — 16.8.0
   * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   * @summary This fires when the componet is mounted and redirects the user to home page
   * is they try to go to the "/signin" route and they are already signed in
   */
  useEffect(() => {
    // router.query.id represent the name of the file [id].js
    let token = router.query.id;
    // If the page exists then story the jwt in the name var
    if (token) {
      const { name } = jwt.decode(token);
      // Place the name and token in the values array
      setValues({ ...values, name, token });
    }
  }, [router]);

  /**
   * @function clickSubmit
   * @param {event} e
   * @fires preventDefault
   * @fires setValues
   * @fires signup
   * @returns {void}
   */
  const clickSubmit = e => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false
        });
      }
    });
  };

  /**
   * @function showLoading
   * @summary If loading is set to true shows loading indicator while signing up
   * @return {html}
   */
  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

  return (
    <Layout>
      <div className="container">
        <h3 className="pb-4">Hey {name}, Ready to activate your account?</h3>
        {showLoading()}
        {error && error}
        {success &&
          "You have successfully activated your account. Please signin."}
        {showButton && (
          <button className="btn btn-outline-primary" onClick={clickSubmit}>
            Activate Account
          </button>
        )}
      </div>
    </Layout>
  );
};

export default withRouter(ActivateAccount);
