import { useState } from "react";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { resetPassword } from "../../../../actions/auth";

/**
 * @function ResetPassword
 * @param {props} props
 * @param {object} props.router
 * @external useState
 * @external withRouter
 * @requires Layout
 * @requires resetPassword
 * @returns {html}
 * @summary Renders the Reset Password page when a user clicks on the
 * reset password link they receive in their email
 * {@link http(s)://baseUrl:3085/auth/reset/[id]}
 */
const ResetPassword = ({ router }) => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true
  });

  /**
   * @constant {object} values
   * @type {boolean} @var showForm
   * @type {string} @var name
   * @type {string} @var newPassword
   * @type {string} @var error
   * @type {string} @var message
   */
  const { showForm, name, newPassword, error, message } = values;

  /**
   * @function handleSubmit
   * @param {event} e
   * @fires setValues
   * @fires resetPassword
   * @returns {void}
   */
  const handleSubmit = e => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id
    }).then(data => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: ""
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: "",
          error: false
        });
      }
    });
  };

  /**
   * @function passwordResetForm
   * @event onSubmit
   * @method handleSubmit
   * @event onChange
   * @fires e @fires setValues
   * @return {html}
   * @summary Generates the passwordResetForm
   */
  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-5">
        <input
          type="password"
          onChange={e => setValues({ ...values, newPassword: e.target.value })}
          className="form-control"
          value={newPassword}
          placeholder="Type new password"
          required
        />
      </div>
      <div>
        <button className="btn btn-primary">Change password</button>
      </div>
    </form>
  );

  /**
   * @function showError
   * @returns {html}
   * @summary Shows error generated from the backend if there
   * is an error when a user is trying to reset their password
   */
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  /**
   * @function showSuccess
   * @returns {html}
   * @summary Shows an success message when successfully resets their passwordk
   */
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  return (
    <Layout>
      <div className="container">
        <h2>Reset password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
