import { useState, useEffect } from "react";
import Router from "next/router";
import { signup, isAuth, preSignup } from "../../actions/auth";

/**
 * @file React Sign Up Component
 * @function SignupComponent
 * @external useState
 * @external useEffect
 * @external Router
 * @requires preSignup
 * @requires signup
 * @requires authenticate
 * @requires isAuth
 * @method handleSubmit
 * @method handleChange
 * @method showLoading
 * @method showError
 * @method showMessage
 * @summary This encapsulates all the functionality and markup to create
 * an account for this application.
 *  @returns {html}
 * @author Amen Ra
 */
const SignupComponent = () => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    name: "Amen Ra",
    email: "mojaray2k@gmail.com",
    password: "password",
    error: "",
    loading: false,
    message: "",
    showForm: true
  });

  /**
   * @constant {object} @var values
   * @type {string} @var string
   * @type {string} @var email
   * @type {string} @var password
   * @type {string} @var error
   * @type {boolean} @var loading
   * @type {string} @var message
   * @type {function} @function showForm @return {html}
   */
  const { name, email, password, error, loading, message, showForm } = values;

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
   * @summary This fires when the component is mounted and redirects the user to home page
   * if they try to go to "/signup" route and they are already signed in
   */
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  /**
   * @function handleSubmit
   * @param {event} e
   * @method preventDefault
   * @method setValues
   * @method preSignup
   * @summary onClick event for user to sign up
   * @return {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false
        });
      }
    });
  };

  /**
   * @function handleChange
   * @param {*} name
   * @param {*} e event
   * @method setValues React useState Hook
   * @summary Getting values as they are entered into inputs on the page
   * @return {void}
   */
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  /**
   * @function showLoading
   * @summary If loading is set to true shows loading indicator while signing up
   * @return {html}
   */
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  /**
   * @function showError
   * @summary Shows error generated from the backend
   * if there is an error on sigining up
   * @return {html}
   */
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  /**
   * @function
   * @summary Shows a message generated from the backend on signup status
   * @return {html}
   */
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  /**
   * @function signupForm
   * @event onSubmit
   * @method handleSubmit
   * @event onChange
   * @method handleChange
   * @return Generates the sign up form
   */
  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>

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
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
