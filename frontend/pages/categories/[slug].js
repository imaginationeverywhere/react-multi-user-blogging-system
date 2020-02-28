import Head from "next/head";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import Layout from "../../components/Layout";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

import Card from "../../components/blog/Card";

/**
 * @file Signle Category Page
 * @function Category
 * @param {*} props
 * @param {props} props.category
 * @param {props} props.blogs
 * @external renderHTML
 * @external moment
 * @external <Head/>
 * @external <Link/>
 * @requires <Layout/>
 * @requires <Card/>
 * @requires SingleCategory
 * @returns {Single Category Page}
 * @summary This page diplays all the information related to a particular category
 * including blogs associated with it
 * @author Amen Ra
 */
const Category = ({ category, blogs }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                {blogs.map((b, i) => (
                  <div key={i}>
                    <Card blog={b} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

/**
 * @method Category
 */
Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs };
    }
  });
};

export default Category;
