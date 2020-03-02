import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";

/**
 * @file User Dashboard Page
 * @function UserIndex
 * @param {object} props
 * @requires Layout
 * @requires Private
 * @returns {html}
 * @summary This page is the User Dashboard Page
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
