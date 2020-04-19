import Router from "next/router";
import GoogleLogin from "react-google-login";
import { loginWithGoogle, authenticate, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";

/**
 * @function LoginGoogle
 * @param {object} props
 * @external Router
 * @external GoogleLogin
 * @requires loginWithGoogle
 * @requires authenticate
 * @requires isAuth
 * @requires GOOGLE_CLIENT_ID
 * @returns {html}
 * @summary Generates a componet for Google Login
 */
const LoginGoogle = props => {
  /**
   * @function responseGoogle
   * @param {object} response
   * @fires loginWithGoogle
   * @fires authenticate
   * @fires isAuth
   * @returns {void}
   * @summary The action of authenticating and login in with Google
   */
  const responseGoogle = response => {
    // console.log(response);
    /**
     * @constant {string} tokenId
     */
    const tokenId = response.tokenId;

    /**
     * @constant {string} user
     */
    const user = { tokenId };

    loginWithGoogle(user).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user`);
          }
        });
      }
    });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
