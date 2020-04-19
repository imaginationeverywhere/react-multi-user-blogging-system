import Head from "next/head";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import Layout from "../../components/Layout";
import { singleTag } from "../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

import Card from "../../components/blog/Card";

/**
 * @file Signle Tag Page
 * @function Tag
 * @param {object} props
 * @param {object} props.tag
 * @param {object} props.blogs
 * @external renderHTML
 * @external moment
 * @external Head
 * @external Link
 * @requires Layout
 * @requires Card
 * @requires singleTag
 * @returns {html}
 * @summary Renders the Single Tag Page
 * {@link http(s)://baseUrl:3085/tags/{slug}}
 * @example http://localhost:3085/tags/react
 * @author Amen Ra
 */
const Tag = ({ tag, blogs, query }) => {
  /**
   * @function head
   * @returns {hmtl}
   * @summary A an html head tag
   */
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name="description" content={`This is the page ${tag.name} tage`} />
      <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
      <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
      <meta
        property="og:description"
        content={`This is the page ${tag.name} tag`}
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
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
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                <h5>Blogs associated with the tag are listed below</h5>
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
 * @function Tag
 * @property {getInitialProps}
 * @method singleTag
 * @returns {tag, blogs, query}
 */
Tag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

export default Tag;
