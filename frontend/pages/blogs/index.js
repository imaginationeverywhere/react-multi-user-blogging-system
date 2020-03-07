import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import { DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";

/**
 * @file Blog Listing Page
 * @function Blogs
 * @param {object} props
 * @param {object} props.blogs
 * @param {array} props.categories
 * @param {array} props.tags
 * @param {number} props.totalBlogs
 * @param {number} props.blogsLimit
 * @param {number} props.blogsSkipped
 * @param {object} props.router
 * @external Head
 * @external Link
 * @external withRouter
 * @external useState
 * @requires Layout
 * @requires DOMAIN
 * @requires APP_NAME
 * @requires FB_APP_ID
 * @requires listBlogsWithCategoriesAndTags
 * @requires Card
 * @returns {html}
 * @summary Like Wordpress this page displays a list of most recent blogs.
 * {@link http(s)://baseUrl:3085/blogs}
 * @author Amen Ra
 */
const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogsSkipped,
  router
}) => {
  /**
   * @function head
   * @returns {hmtl}
   * @summary A an html head tag
   */
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming and tutorials about react, node, next, and redux."
      />
      <link rel="cannical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web development tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming and tutorials about react, node, next, and redux."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
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

  /**
   * @constant {function} useState @returns {void}
   * @param blogsLimit
   * @type {number} @var limit
   * @type {function} @function setLimit @returns {void}
   */
  const [limit, setLimit] = useState(blogsLimit);

  /**
   * @constant {function} useState @returns {void}
   * @param {number}
   * @type {number} @var skip
   * @type {function} @function setSkip @returns {void}
   */
  const [skip, setSkip] = useState(0);

  /**
   * @constant {function} useState @returns {void}
   * @param {number} @var totalBlogs
   * @type {number} @var size
   * @type {function} @function setSize @returns {void}
   */
  const [size, setSize] = useState(totalBlogs);

  /**
   * @constant {function} useState @returns {void}
   * @param {array}
   * @type {array} @var loadedBlogs
   * @type {function} @function setloadedBlogs @returns {void}
   */
  const [loadedBlogs, setloadedBlogs] = useState([]);

  /**
   * @function loadMore
   * @fires listBlogsWithCategoriesAndTags
   * @returns {void}
   */
  const loadMore = () => {
    let toSkip = skip + limit;
    /**
     * @function listBlogsWithCategoriesAndTags
     * @fires setloadedBlogs
     * @fires setSize
     * @fires setSkip
     * @returns {void}
     */
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setloadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  /**
   * @function loadMoreButton
   * @event onClick @fires loadMore
   * @returns {html}
   * @summary Renders the Load More button which fires the loadMore event
   */
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  /**
   * @function showAllBlogs
   * @returns {html}
   * @summary Show the initial number of blogs based on the @param limit
   * in @function listBlogsWithCategoriesAndTags
   */
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  /**
   * @function showAllCategories
   * @returns {html}
   * @summary Renders a list of all categories as button Links
   */
  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  /**
   * @function showAllTags
   * @returns {html}
   * @summary Renders a list of all tags as button Links
   */
  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  /**
   * @function showLoadedBlogs
   * @returns {html}
   * @summary Loads more blogs based on the @param limit
   * in @function listBlogsWithCategoriesAndTags
   */
  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="contaner-fluid">
            <header>
              <div className="col-md-12-pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Diversity Developers Blogs and Tutorials
                </h1>
              </div>
            </header>
          </div>
          <div className="container-fluid">{showAllBlogs()}</div>
          <div className="container-fluid">{showLoadedBlogs()}</div>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
          <section>
            <div className="pb-5 text-center">
              <h2> Categories</h2>
              {showAllCategories()}
              <br />
              <br />
              <h2>Tags</h2>
              {showAllTags()}
            </div>
          </section>
        </main>
      </Layout>
    </React.Fragment>
  );
};

/**
 * @function Blogs
 * @property {getInitialProps}
 * @fires listBlogsWithCategoriesAndTags
 * @returns {function}
 */
Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 10;

  /**
   * @function listBlogsWithCategoriesAndTags
   * @param skip
   * @param limit
   * @return {object}
   */
  return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkipped: skip
      };
    }
  });
};

export default withRouter(Blogs);
