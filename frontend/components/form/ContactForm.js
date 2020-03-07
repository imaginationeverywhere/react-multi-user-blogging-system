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
  return (
    <React.Fragment>
      <p>show contact form</p>
    </React.Fragment>
  );
};

export default ContactForm;
