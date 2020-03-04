import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";

/**
 * @file User Dashboard Page
 * @function UserIndex
 * @param {*} props
 * @requires <Layout/>
 * @requires <Private/>
 * @returns {User Dashboard Page}
 * @summary This page is the Dashboard Page for a user
 * @author Amen Ra
 */
const UserIndex = props => {
  return (
    <Layout>
      <Private>
        <h2>User Dashboard</h2>
      </Private>
    </Layout>
  );
};

export default UserIndex;
