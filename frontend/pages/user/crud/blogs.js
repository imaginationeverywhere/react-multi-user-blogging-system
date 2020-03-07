import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogRead from "../../../components/crud/BlogRead";
import { isAuth } from "../../../actions/auth";

/**
 * @function Blog
 * @param {object} props
 * @requires Layout
 * @requires Private
 * @requires BlogRead
 * @requires isAuth
 * @return {html}
 * @summary This is the User Blog Management Page
 * {@link http(s)://baseUrl:3085/user/crud/blogs}
 * @author Amen Ra
 */
const Blog = props => {
  const username = isAuth() && isAuth().username;
  return (
    <Layout>
      <Private>
        <div className="container">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-12">
              <BlogRead username={username} />
            </div>
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;