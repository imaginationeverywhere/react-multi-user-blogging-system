import { useState } from "react";
import Layout from "../../../components/Layout";
import { forgotPassword } from "../../../actions/auth";

/**
 * @function ForgotPassword
 * @param {object} props
 * @external useState
 * @requires Layout
 * @requires forgotPassword
 * @returns {HTML}
 * @summary This is the forgot password page
 * {@link http(s)://baseUrl:3085/auth/password/forgot}
 */
const ForgotPassword = props => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true
  });

  /**
   * @constant {object} values
   * @type {string} @var email
   * @type {string} @var message
   * @type {string} @var error
   * @type {boolean} @var showForm
   */
  const { email, message, error, showForm } = values;

  /**
   * @function handleChange
   * @param {array} name
   * @param {event} e
   * @fires setValues
   * @returns {void}
   */
  const handleChange = name => e => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  /**
   * @function handleSubmit
   * @param {event} e
   * @fires setValues
   * @fires forgotPassword
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword({ email }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          showForm: false
        });
      }
    });
  };

  /**
   * @function showError
   * @returns {html}
   * @summary Shows error generated from the backend if there
   * is an error when entering an email address and clicking submit
   */
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  /**
   * @function showSuccess
   * @returns {html}
   * @summary Shows an success message when sending a reset password link
   */
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  /**
   * @function passwordForgotForm
   * @event onSubmit
   * @method handleSubmit
   * @event onChange
   * @method handleChange
   * @return {html}
   * @summary Generates the passwordForgotForm
   */
  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-5">
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
          placeholder="Type your email"
          required
        />
      </div>
      <div>
        <button className="btn btn-primary">Send password reset link</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="container">
        <h2>Forgot password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
