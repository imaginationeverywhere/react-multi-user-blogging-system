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
 * @author Amen Ra
 */
const Signin = props => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signin</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
