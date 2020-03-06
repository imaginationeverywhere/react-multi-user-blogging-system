import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import Layout from "../../components/Layout";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import SmallCard from "../../components/blog/SmallCard";
import DisqusThread from "../../components/DisqusThread";

/**
 * @file Single Blog Page
 * @function SingleBlog
 * @param {object} props
 * @param {object} props.blog
 * @param {object} props.query
 * @external Head
 * @external Link
 * @external useState
 * @external useEffect
 * @external renderHTML
 * @external moment
 * @requires Layout
 * @requires singleBlog
 * @requires listRelated
 * @requires API
 * @requires DOMAIN
 * @requires APP_NAME
 * @requires FB_APP_ID
 * @requires SmallCard
 * @requires DisqusThread
 * @returns {html}
 * @summary Renders the Single Blog Page
 * @author Amen Ra
 */
const SingleBlog = ({ blog, query }) => {
  /**
   * @function useState
   * React hook that has an @Array of related[] and to add more use @function setRelated
   */
  const [related, setRelated] = useState([]);

  /**
   * @function loadRelated
   * @requires listRelated
   * @returns {void}
   * @summary Fetches list of blogs
   */
  const loadRelated = () => {
    listRelated({ blog }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  /**
   * @external useEffect
   * @fires loadRelated
   * @returns {void}
   * @description Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   * @version — 16.8.0
   * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   * @summary This fires when the compoennt is mounted and
   * loads a list of related blogs.
   */
  useEffect(() => {
    loadRelated();
  }, []);

  /**
   * @function head
   * @returns {hmtl}
   * @summary A an html head tag
   */
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  /**
   * @function showBlogCategories
   * @param {object} blog this is a prop on the parent SingleBlog
   * @property {array} @var blog.categories
   * @returns {html}
   * @description Renders the tag slug and tag name
   * @summary This maps through the categories object and returns an
   * array of categories associated  with this particular blog
   */
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  /**
   * @function showBlogTags
   * @param {object} blog this is a prop on the parent SingleBlog
   * @property {array} @var blog.tags
   * @returns {html}
   * @description Renders the tag slug and tag name
   * @summary This maps through the tags object and returns an
   * array of tags associated  with this particular blog
   */
  const showBlogTags = blog =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  /**
   * @function showRelatedBlog
   * @returns {html}
   * @summary Renders each blog that is associated with this blog
   */
  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };

  /**
   * @function showComments
   * @returns {html}
   * @summary Renders each group of comments that is associated with this blog
   */
  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog.id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by{" "}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.username}</a>
                    </Link>
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className="pb-3">
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>

            <div className="container">
              <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
              <div className="row">
                {/* JSON.stringify(related) */}
                {showRelatedBlog()}
              </div>
            </div>

            <div className="container pt-5 pb-5">{showComments()}</div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

/**
 * @function SingleBlog
 * @property {getInitialProps}
 * @fires singleBlog
 * @returns {blog, query}
 */
SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
      return { blog: data, query };
    }
  });
};

export default SingleBlog;
