import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CreateBlog from "../../../components/crud/CreateBlog";

/**
 * @file Create A Single Blog Page
 * @function Blog
 * @param {*} props
 * @requires <Layout/>
 * @requires <Admin/>
 * @requires <CreateBlog/>
 * @returns {Create A Single Blog Page}
 * @author Amen Ra
 */
const Blog = props => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Create a new blog</h2>
            </div>
            <div className="col-md-12 pt-5 pb-5">
              <CreateBlog />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
