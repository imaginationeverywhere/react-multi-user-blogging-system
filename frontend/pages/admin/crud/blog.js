import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import CreateBlogPost from "../../../components/crud/CreateBlogPost";

/**
 * @file Create A Single Blog Page
 * @function Blog
 * @param {object} props
 * @requires Layout
 * @requires Admin
 * @requires CreateBlog
 * @returns {html}
 * @summary Renders the html on the Admin Dashboard that
 * links to the Create Blog Page {@link http(s)://baseUrl:3085/admin/crud/blog}
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
              <CreateBlogPost />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
