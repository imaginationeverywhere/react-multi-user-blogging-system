import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

/**
 * @function ContactForm
 * @param {object} props
 * @external useState
 * @external Link
 * @requires emailContactForm
 * @returns {html}
 * @summary
 * @author Amen Ra
 */
const ContactForm = props => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false
  });

  /**
   * @constant {object} values
   * @type {string} @var message
   * @type {string} @var name
   * @type {string} @var email
   * @type {boolean} @var sent
   * @type {string} @var buttonText
   * @type {boolean} @var success
   * @type {boolean} @var error
   */
  const { message, name, email, sent, buttonText, success, error } = values;

  /**
   * @function clickSubmit
   * @param {event} e
   * @fires setValues
   * @fires emailContactForm
   * @returns {void}
   * @summary This is the function that handles the
   * onSubmit event for the @function contactForm*
   */
  const clickSubmit = e => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({ name, email, message }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
          success: data.success
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
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send Message"
    });
  };

  /**
   * @function showSuccessMessage
   * @returns {html}
   * @summary Shows an success message when a email is successfully sent
   */
  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thank you for contacting us.</div>
    );

  /**
   * @function showErrorMessage
   * @summary Shows error generated from the backend
   * if there is an error on sending an email
   * @return {html}
   */
  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  /**
   * @function contactForm
   * @event onSubmit
   * @method clickSubmit
   * @event onChange
   * @method handleChange
   * @return {html}
   * @summary Generates the contact form
   */
  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
            rows="10"
          ></textarea>
        </div>

        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </React.Fragment>
  );
};

export default ContactForm;
