import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { getCookie } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import "../../node_modules/react-quill/dist/quill.snow.css";

/**
 * @file Create Blog Component
 * @function CreateBlog
 * @param {*} props
 * @param {props} props.router
 * @external useState
 * @external useEffect
 * @external dynamic
 * @external withRouter
 * @external ReactQuill
 * @requires getCookie
 * @requires getCategories
 * @requires getTags
 * @requires createBlog
 * @requires QuillModules
 * @requires QuillFormates
 * @returns {<CreateBlog />}
 * @summary This component is used on the Create Blog Page
 * {@link frontend/pages/admin/crud/blog.js}
 * @author Amen Ra
 */
const CreateBlog = ({ router }) => {
  /**
   * @function blogFromLS
   * @returns {JSON}
   * @summary Gets Blog Data from Local Storage
   */
  const blogFromLS = () => {
    // if the window is not available
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  /**
   * @constant {function} useState @returns {void}
   * @type {array} @var categories
   * @type {function} @function setCategories @returns {void}
   */
  const [categories, setCategories] = useState([]);

  /**
   * @constant {function} useState @returns {void}
   * @type {array} @var tags
   * @type {function} @function setTags @returns {void}
   */
  const [tags, setTags] = useState([]);

  /**
   * @constant {function} useState @returns {void}
   * @type {array} @var checkedCategory
   * @type {function} @function setCheckedCategory @returns {void}
   */
  const [checkedCategory, setCheckedCategory] = useState([]);

  /**
   * @constant {function} useState @returns {void}
   * @type {array} @var checkedTag
   * @type {function} @function setCheckedTag @returns {void}
   */
  const [checkedTag, setCheckedTag] = useState([]);

  /**
   * @constant {function} useState @returns {void}
   * @type {string} @var body
   * @type {function} @function setBody @returns {JSON}
   */
  const [body, setBody] = useState(blogFromLS());

  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false
  });

  /**
   * @constant {object} values
   * @type {string} @var error
   * @type {string} @var sizeError
   * @type {string} @var success
   * @type {sting} @var formData
   * @type {string} @var title
   * @type {boolean} @var hidePublishButton
   */
  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton
  } = values;

  /**
   * @constant {function} token
   * @fires getCookie @param {string}
   */
  const token = getCookie("token");

  /**
   * @external useEffect
   * @fires setValues
   * @fires initCategories
   * @fires initTags
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
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  /**
   * @function initCategories
   * @fires getCategories
   * @returns {void}
   * @summary Api GET request to retrieve categories that are already in the
   * database from the backend
   */
  const initCategories = () => {
    /**
     * @function getCategories
     * @fires setValues
     * @fires setCategories
     * @returns {void}
     */
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  /**
   * @function initTags
   * @returns {void}
   * @summary Api GET request to retrieve tags that are already in the
   * database from the backend
   */
  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  /**
   * @function publishBlog
   * @param {event} e
   * @fires preventDefault
   * @fires createBlog
   * @returns {void}
   * @summary createBlogForm onSubmit method that POSTS data back to the backend to create a blog
   */
  const publishBlog = e => {
    e.preventDefault();
    // console.log("ready to publish blog");
    /**
     * @function createBlog
     * @fires setValues
     * @fires setBody
     * @fires setCategories
     * @fires setTags
     * @returns {void}
     */
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" is created`
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
  };

  /**
   * @function handleChange
   * @param {function} e
   * @param {Array} name
   * @fires setValues
   * @fires set
   * @summary Getting values as they are entered into inputs on the Create Blog page
   * @return {void}
   */
  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  /**
   * @function handleBody
   * @param {event} e
   * @fires setBody
   * @returns {void}
   */
  const handleBody = e => {
    // console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  /**
   * @function handleToggleCategory
   * @param {event} c
   * @fires setValues (@param {object} @returns {void})
   * @fires setCheckedCategory (@param {object} @returns {void})
   * @returns {void}
   * @summary Records if a category is checked or unchecked in the database
   */
  const handleToggleCategory = c => () => {
    setValues({ ...values, error: "" });
    const all = [...checkedCategory];
    const clickedCategory = checkedCategory.indexOf(c);

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    // console.log(all);
    setCheckedCategory(all);
    formData.set("categories", all);
  };

  /**
   * @function handleToggleTag
   * @param {event} t
   * @fires setValues (@param {object} @returns {void})
   * @fires setCheckedTag (@param {object} @returns {void})
   * @returns {void}
   * @summary Records if a tag is checked or unchecked in the database
   */
  const handleToggleTag = t => () => {
    setValues({ ...values, error: "" });
    const all = [...checkedTag];
    const clickedTag = checkedTag.indexOf(t);

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }

    // console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  /**
   * @function showCategories
   * @event onChange (@fires handleToggleCategory)
   * @returns {html}
   * @summary Displays a checkbox for every category that exists in the database
   */
  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleCategory(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  /**
   * @function showTags
   * @event onChange @fires handleToggleTag
   * @returns {html}
   * @summary Displays a checkbox for every category that exists in the database
   */
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggleTag(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  /**
   * @function showError
   * @returns {html}
   * @summary Shows an error message when a blog is not successfully created
   */
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  /**
   * @function showSuccess
   * @returns {html}
   * @summary Shows an success message when a blog is successfully created
   */
  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  /**
   * @function createBlogForm
   * @returns {html}
   * @event onChange @fires handleChange @fires handleBody
   * @summary This return the Input to Enter a Blog Title and the Quill Editor
   * to put content in the blog
   */
  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
          </div>
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <small className="text-muted">Max size: 1mb</small>
              <br />
              <label className="btn btn-outline-info">
                Upload Featured Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange("photo")}
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
