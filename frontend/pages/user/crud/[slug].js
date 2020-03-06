import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import UpdateBlog from "../../../components/crud/updateBlog";

/**
 * @file Update Single Blog Page
 * @function Blog
 * @param {object} props
 * @requires Layout
 * @requires Private
 * @requires UpdateBlog
 * @returns {htmls}
 * @summary Renders the single blog page
 * @author Amen Ra
 */
const Blog = props => {
  return (
    <Layout>
      <Private>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Update blog</h2>
            </div>
            <div className="col-md-12">
              <UpdateBlog />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
