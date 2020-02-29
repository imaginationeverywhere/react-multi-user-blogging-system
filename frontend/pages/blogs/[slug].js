import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blog/SmallCard";

/**
 * @file React Single Blog Page
 * @function SingleBlog
 * @param {*} props
 * @param {props} props.blog
 * @param {props} props.query
 * @returns {SingleBlog} Next.js Page
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
   * @function useEffect
   * React hook equivalent to componentDidMount, loads the Related Blogs data once the component is rendered on the page
   */
  useEffect(() => {
    loadRelated();
  }, []);

  /**
   * @function head
   * @returns {Head}
   * @description A <Head> Component with a Blog Title, App Name, Blog Description, Canoncal URL, Facebook App ID
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
   * @param {*} blog this is a prop on the parent SingleBlog
   * @property blog categories
   * This maps through the categories object and returns an array of categories associated
   * with this particular blog
   * @returns {<Link /> component} with the category slug and category name
   */
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  /**
   * @function showBlogTags
   * @param {*} blog this is a prop on the parent SingleBlog
   * @property blog tags
   * This maps through the tags object and returns an array of tags associated
   * with this particular blog
   * @returns {<Link /> component} with the tag slug and tag name
   */
  const showBlogTags = blog =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  /**
   * @function showRelatedBlog
   * @returns {<SmallCard component} for each blog that is associated with this blog
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
                    Written by {blog.postedBy.name} | Published{" "}
                    {moment(blog.updatedAt).fromNow()}
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

            <div className="container pb-5">
              <p>show comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

/**
 * @function SingleBlog
 * @property {getInitialProps}
 * @argument {query}
 * @method singleBlog
 * @returns {data, query}
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
