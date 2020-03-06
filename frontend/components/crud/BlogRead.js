import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

/**
 * @function BlogRead
 * @param {object} props
 * @param {string} props.username
 * @external Link
 * @fires useState
 * @fires useEffect
 * @requires getCookie
 * @requires isAuth
 * @requires list
 * @requires removeBlog
 * @external moment
 * @returns {html}
 * @summary This is the component that has the functionality
 * to update and delete blogs by an authenticated user
 * @author Amen Ra
 */
const BlogRead = ({ username }) => {
  /**
   * @constant {function} useState @returns {void}
   * @type {array} @var blogs
   * @type {function} @function setBlogs @returns {void}
   */
  const [blogs, setBlogs] = useState([]);

  /**
   * @constant {function} useState @returns {void}
   * @type {string} @var message
   * @type {function} @function setMessage @returns {void}
   */
  const [message, setMessage] = useState("");

  /**
   * @constant {function} token
   * @fires getCookie @param {string}
   */
  const token = getCookie("token");

  /**
   * @external useEffect
   * @fires loadBlogs
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
    loadBlogs();
  }, []);

  /**
   * @function loadBlogs
   * @returns {Array} of checkboxes and labels
   * @summary Displays list of every category that exists in the database
   */
  const loadBlogs = () => {
    list(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  /**
   * @function deleteBlog
   * @param {String} slug
   * @returns {void}
   * @summary Deletes a blog that is store in the database on the backend
   */
  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  /**
   * @function deleteConfirm
   * @param {String} slug
   * @returns {void}
   * @summary Displays a display prompt when attempting to delete a blog
   */
  const deleteConfirm = slug => {
    let answer = window.confirm("Are you sure you want to delete your blog?");
    if (answer) {
      deleteBlog(slug);
    }
  };

  /**
   * @function showUpdateButton
   * @param {String} blog
   * @returns {HTML} Link Component
   * @summary Renders the Update Blog Button
   */
  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    }
  };

  /**
   * @function showAllBlogs
   * @param {String} blog
   * @returns {HTML}
   * @summary Renders the Blog List and Update Blog and Delete Button
   */
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="pb-5">
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name} | Published on{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete
          </button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogRead;
