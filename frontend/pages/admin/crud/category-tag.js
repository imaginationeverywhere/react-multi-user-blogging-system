import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

/**
 * @file Manage Categories and Tags
 * @function CategoryTag
 * @param {object} props
 * @requires Layout
 * @requires Admin
 * @requires Category
 * @requires Tag
 * @returns {html}
 * @summary Renders the links that navigate to the Manage
 * Categories and Tags Page
 * {@link http(s)://baseUrl:3085/admin/crud/category-tag}
 * @author Amen Ra
 */
const CategoryTag = props => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>Manage Categories and Tags</h2>
            </div>
            <div className="col-md-6">
              <Category />
            </div>
            <div className="col-md-6">
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
