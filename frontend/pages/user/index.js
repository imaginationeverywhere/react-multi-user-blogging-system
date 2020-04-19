import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

/**
 * @file User Dashboard Page
 * @function UserIndex
 * @param {object} props
 * @requires Layout
 * @requires Private
 * @returns {html}
 * @summary This page is the User Dashboard Page
 * {@link http(s)://baseUrl:3085/user}
 * @author Amen Ra
 */
const UserIndex = props => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>User Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  {/* Force page to reload using <a> tag so 
                    editor always renders correctly  */}
                  <a href="/user/crud/blog">Create Blog</a>
                </li>
                <li className="list-group-item">
                  <Link href="/user/crud/blogs">
                    <a>Update/Delete Blogs</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  {/* Force page to reload using <a> tag so 
                    editor always renders correctly  */}
                  <a href="/user/update">Update Profile</a>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
