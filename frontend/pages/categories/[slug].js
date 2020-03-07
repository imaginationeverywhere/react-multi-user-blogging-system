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
 * @param {object} props
 * @param {object} props.category
 * @param {object} props.blogs
 * @external renderHTML
 * @external moment
 * @external Head
 * @external Link
 * @requires Layout
 * @requires Card
 * @requires SingleCategory
 * @returns {html}
 * @summary Renders the Single Category Page
 * {@link http(s)://baseUrl:3085/categories/{slug}}
 * @example http://localhost:3085/categories/react
 * @author Amen Ra
 */
const Category = ({ category, blogs, query }) => {
  /**
   * @function head
   * @returns {hmtl}
   * @summary A an html head tag
   */
  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`This is the page ${category.name} category`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`This is the page ${category.name} category`}
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/diversityblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/diversityblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                <h5>Blogs associated with the category are listed below</h5>
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
 * @function Category
 * @property {getInitialProps}
 * @method singleCategory
 * @returns {category, blogs, query}
 */
Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;
