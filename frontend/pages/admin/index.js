import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

/**
 * @file Admin Dashboard Page
 * @function AdminIndex
 * @param {*} props
 * @requires <Layout/>
 * @requires <Admin/>
 * @requires <Link/>
 * @returns {Admin Dashboard page}
 * @summary From this page you will be as an admin user to create,
 * update, or delete a blog, tag, or category.
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
                  <Link href="/admin/crud/blog">
                    <a>Create Blog</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Update/Delete Blogs</a>
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
