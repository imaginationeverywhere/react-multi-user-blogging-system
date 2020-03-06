import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent";

/**
 * @file Sign Up Page
 * @function Signup
 * @param {object} props
 * @requires Layout
 * @requires SignupComponent
 * @returns {html}
 * @summary This is the page where a user goes to create an account
 * @author Amen Ra
 */
const Signup = props => {
  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Signup</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
