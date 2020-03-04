import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

/**
 * @file Admin Dashboard Page
 * @function AdminIndex
 * @param {object} props
 * @requires Layout
 * @requires Admin
 * @requires Link
 * @returns {html}
 * @summary Renders the Admin Dashboard Page.
 * @author Amen Ra
 */
const AdminIndex = props => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Admin Dashboard</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Category</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Tag</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  {/* Force page to reload using <a> tag so 
                    editor always renders correctly  */}
                  <a href="/admin/crud/blog">Create Blog</a>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Update/Delete Blogs</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">Right</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
