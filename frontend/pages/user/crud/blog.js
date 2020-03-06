import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import CreateBlogPost from "../../../components/crud/CreateBlogPost";

/**
 * @file Create A Single Blog Page
 * @function Blog
 * @param {object} props
 * @requires Layout
 * @requires Private
 * @requires CreateBlog
 * @returns {html}
 * @summary Renders the html on the User Dashboard that
 * links to the Create Blog Page
 * @author Amen Ra
 */
const CreatePost = props => {
  return (
    <Layout>
      <Private>
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
      </Private>
    </Layout>
  );
};

export default CreatePost;
