import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

/**
 * @file React Card Component
 * @function Card
 * @param {*} this.props.blog
 * @external renderedHTML
 * @external moment
 * @external Link
 * @requires API
 * @method showBlogCategories*
 * @returns {html}
 * @summary This is used to display blog data in a blog list or related blogs
 * {@link frontend/pages/blogs/index.js}
 * {@link frontend/pages/categories/[slug].js}
 * @author Amen Ra
 */
const Card = ({ blog }) => {
  /**
   * @function showBlogCategories
   * @param {arrau} blog
   * @returns {html}
   * @summary Shows a list of Blog Categories
   */
  const showBlogCategories = blog =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  /**
   * @function showBlogTags
   * @param {array} blog
   * @returns {html}
   * @summary Shows a list of Blog tags
   */
  const showBlogTags = blog =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
    <div className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 pt-2 pb-2">
          Written by{" "}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.username}</a>
          </Link>{" "}
          | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
        <br />
        <br />
      </section>
      <div className="row">
        <div className="col-md-4">
          <section>
            <img
              style={{ maxHeight: "auto", width: "100%" }}
              src={`${API}/blog/photo/${blog.slug}`}
              className="img img-fluid"
              alt={blog.title}
            />
          </section>
        </div>
        <div className="col-md-8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>

            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read More</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
