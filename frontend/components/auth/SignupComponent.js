import { useState, useEffect } from "react";
import Router from "next/router";
import { signup, isAuth } from "../../actions/auth";

/**
 * @file React Sign Up Component
 * @function SignupComponent
 * @external useState
 * @external useEffect
 * @external Router
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
 *  @returns {SignupComponent} Renders a React Sign Up Component html and css code
 * @author Amen Ra
 */
const SignupComponent = () => {
  /**
   * @constant {Array}
   * @type {object <values>}
   * @type {function <setValues>}
   * @method useState
   * {@link https://reactjs.org/docs/hooks-state.html React}
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
   * @constant {values}
   * @type {string <name>}
   * @type {string <email>}
   * @type {string <password>}
   * @type {string <error>}
   * @type {boolean <loading>}
   * @type {string <message>}
   * @type {function <showForm>}
   */
  const { name, email, password, error, loading, message, showForm } = values;

  /**
   * @method useEffect
   * @method isAuth
   * @method Router.push
   * @summary redirect user to home page is they try to go to
   * the "/signup" route and they are already signed in
   * {@link https://reactjs.org/docs/hooks-effect.html React}
   */
  useEffect(() => {
    isAuth() && Router.push("/");
  }, []);

  /**
   * @function handleSubmit
   * @param {*} e
   * @method preventDefault
   * @method setValues React useState Hook
   * @method signup action
   * @summary onClick event for user to sign up
   * @return {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then(data => {
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
   * @return {void}
   */
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  /**
   * @function showError
   * @summary Shows error generated from the backend
   * if there is an error on sigining up
   * @return {void}
   */
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  /**
   * @function
   * @summary Shows a message generated from the backend on signup status
   * @return {void}
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
