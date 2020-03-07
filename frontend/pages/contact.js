import Layout from "../components/Layout";
import Link from "next/link";
import ContactForm from "../components/form/ContactForm";

/**
 * @function Contact
 * @param {object} props
 * @external Link
 * @requires ContactForm
 * @returns {html}
 * @summary This is the contact form page {@link http(s)://baseUrl:3085/contact}
 * @author Amen Ra
 */
const Contact = props => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2>Contact form</h2>
            <hr />
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
