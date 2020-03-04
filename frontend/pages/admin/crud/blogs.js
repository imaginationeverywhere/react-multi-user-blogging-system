import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import ReadBlogs from "../../../components/crud/ReadBlogs";

/**
 * @file Manage Blogs Page
 * @function Blogs
 * @param {*} props
 * @requires <Layout/>
 * @requires <Admin/>
 * @requires <ReadBlogs/>
 * @returns {Manage Blogs Page}
 * @summary This page allows you to either Update of Delete Blogs
 * @author Amen Ra
 */
const Blogs = props => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12 pb-5">
              <ReadBlogs />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
