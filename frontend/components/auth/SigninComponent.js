import { useState, useEffect } from "react";
import Router from "next/router";
import { signin, authenticate, isAuth } from "../../actions/auth";

/**
 * @file React Signin Component
 * @function SigninComponent
 * @external useState
 * @external useEffect
 * @external Router
 * @requires signin
 * @requires authenticate
 * @requires isAuth
 * @method handleSubmit
 * @method handleChange
 * @method showLoading
 * @method showError
 * @method showMessage
 * @returns {html}
 * @summary Renders a React Sign In Component html and css code
 * @author Amen Ra
 */
const SigninComponent = () => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    email: "mojaray2k@gmail.com",
    password: "password",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  /**
   * @constant {object} values
   * @type {string} @var email
   * @type {string} @var password
   * @type {string} @var error
   * @type {boolean} @var loading
   * @type {string} @var message
   * @type {function} @function howForm
   */
  const { email, password, error, loading, message, showForm } = values;

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
   * @summary This fires when the componet is mounted and redirects the user to home page
   * is they try to go to the "/signin" route and they are already signed in
   */
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  /**
   * @function handleSubmit
   * @param {*} e
   * @method preventDefault
   * @method setValues React Hook
   * @method signin action
   * @method authenticate action
   * @summary onClick event for user to sign in
   * @return {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    // console.table({  email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        /**
         * @method authenticate
         * @summary save user token to cookie
         * @summary save user info to localstorage
         * @summary authenticate user
         */
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };

  /**
   * @function handleChange
   * @param {array} name
   * @param {function} e event
   * @method setValues React Hook
   * @summary Getting values as they are entered into inputs on the page
   * @return {void}
   */
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  /**
   * @function showLoading
   * @summary If loading is set to true Shows loading indicator while signing in
   * @return {void}
   */
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  /**
   * @function showError
   * @summary Shows error generated from the backend
   * if there is an error on signin
   * @return {void}
   */
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  /**
   * @function showMessage
   * @summary Shows a message generated from the backend on signin status
   * @return {void}
   */
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  /**
   * @function signinForm
   * @event onSubmit
   * @method handleSubmit
   * @event onChange
   * @method handleChange
   * @return {signinForm} Generates the sign in form
   */
  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>

        <div>
          <button className="btn btn-primary">Signin</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </React.Fragment>
  );
};

export default SigninComponent;
