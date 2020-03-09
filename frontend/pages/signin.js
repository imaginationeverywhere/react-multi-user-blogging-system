import { withRouter } from "next/router";
import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent";

/**
 * @file Sign In Page
 * @function Signin
 * @param {object} props
 * @requires Layout
 * @requires SigninComponent
 * @returns {html}
 * @summary This is the page where a user goes to sign into their account
 * {@link http(s)://baseUrl:3085/signin}
 * @author Amen Ra
 */
const Signin = ({ router }) => {
  /**
   * @function showRedirectMessage
   * @returns {html}
   * @summary Returns a message indicated the user session has expired and they
   * need to sign in again.
   */
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <h2 className="text-center pt-4 pb-4">Signin</h2>

        <div className="row">
          <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
            <SigninComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
