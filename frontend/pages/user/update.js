import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import ProfileUpdate from "../../components/auth/ProfileUpdate";

/**
 * @file User Dashboard Page
 * @function UserProfileUpdate
 * @param {object} props
 * @requires Layout
 * @requires Private
 * @returns {html}
 * @summary This page is the User Update Page
 * {@link http(s)://baseUrl:3085/user/update}
 * @author Amen Ra
 */
const UserProfileUpdate = props => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <ProfileUpdate />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
