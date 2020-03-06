import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { QuillModules, QuillFormats } from "../../helpers/quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { API } from "../../config";

/**
 * @file Update Blog Compoent
 * @function UpdateBlog
 * @param {*} props
 * @param {props} props.router
 * @external Router
 * @external useEffect
 * @external useState
 * @external dynamic
 * @external withRouter
 * @requires isAuth
 * @requires getCookie
 * @requires getCategories
 * @requires singleBlog
 * @requires updateBlog
 * @requires API
 * @constant {function} ReactQuill @fires dynamic
 * @summary This component is used on the Update Single Blogs Page
 * {@link frontend/pages/user/crud/{slug}.js}
 * @returns {html}
 * @author Amen Ra
 */
const UpdateBlog = ({ router }) => {
  /**
   * @constant {function} useState @returns {void}
   * @type {string} @var body
   * @type {function} @function setBody @returns {void}
   */
  const [body, setBody] = useState("");

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
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: "",
    body: ""
  });

  /**
   * @constant {object} values
   * @type {string} @var title
   * @type {string} @var error
   * @type {string} @var success
   * @type {string} @var formData
   */
  const { error, success, formData, title } = values;

  /**
   * @constant {function} token
   * @fires getCookie @param {string}
   */
  const token = getCookie("token");

  /**
   * @external useEffect
   * @fires setValues (@returns {void})
   * @fires initBlog (@returns {void})
   * @fires initCategories (@returns {void})
   * @fires initTags (@returns {void})
   * @returns {void}
   * @description Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   * @version — 16.8.0
   * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   * @summary This fires when the compoennt is mounted and loads
   * the existing blog content which is the FormData
   * the actual blog
   * list of categories associated with this blog
   * list tags associated with this log
   */
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  /**
   * @function initBlog
   * @fires singleBlog (
   *  @param {string} router.query.slug
   *  @fires setValues (@param {object} @returns {void})
   *  @fires setBody (@param {object} @returns {void})
   *  @fires setCategoriesArray (@param {object} @returns {void})
   *  @fires setTagsArray (@param {object} @returns {void})
   * )
   * @returns {void}
   */
  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  /**
   * @function setCategoriesArray
   * @param {array} blogCategories
   * @fires setCheckedCategory (@param {array} @returns {void})
   */
  const setCategoriesArray = blogCategories => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setCheckedCategory(ca);
  };

  /**
   * @function setCategoriesArray
   * @param {array} blogTags
   * @fires setCheckedTag (@param {array} @returns {void})
   */
  const setTagsArray = blogTags => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };

  /**
   * @function initCategories
   * @fires getCategories (
   *  @fires setValues (@param {object} @returns {void})
   *  @fires setCategories (@param {object} @returns {void})
   * )
   * @returns {void}
   */
  const initCategories = () => {
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
   * @fires getTags (
   *  @fires setValues (@param {object} @returns {void})
   *  @fires setTags (@param {object} @returns {void})
   * )
   * @returns {void}
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

    console.log(all);
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

    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  /**
   * @function findCheckCategory
   * @param {number} c
   * @returns {boolean}
   */
  const findCheckCategory = c => {
    const result = checkedCategory.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * @function findCheckTag
   * @param {number} c
   * @returns {boolean}
   */
  const findCheckTag = t => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
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
            checked={findCheckCategory(c._id)}
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
   * @event onChange (@fires handleToggleTag)
   * @returns {html}
   * @summary Displays a checkbox for every category that exists in the database
   */
  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            checked={findCheckTag(t._id)}
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
   * @function handleChange
   * @param {function} e
   * @param {Array} name
   * @fires setValues (@param {object} @returns {void})
   * @fires set (@param {array} @param {string} @returns {void})
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
   * @fires setBody (@param {event} @returns {void})
   * @returns {void}
   */
  const handleBody = e => {
    setBody(e);
    formData.set("body", e);
  };

  /**
   * @function editBlog
   * @param {event} e
   * @fires preventDefault (@returns {void})
   * @fires updateBlog (@returns {void})
   * @returns {void}
   * @summary createBlogForm onSubmit method that POSTS data back to the backend to create a blog
   */
  const editBlog = e => {
    e.preventDefault();
    /**
     * @function updateBlog
     * @param {string} formData
     * @param {string} token
     * @param {string} router.query.slug
     * @fires setValues (@param {object} @returns {void})
     * @fires isAuth (@param {boolean} @returns {number})
     * @fires Router.replace (@param {string} @returns {string})
     * @fires setTags
     * @returns {void}
     */
    updateBlog(formData, token, router.query.slug).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          success: `Blog titled "${data.title}" is successfully updated`
        });
        if (isAuth() && isAuth().role === 1) {
          // Router.replace(`/admin/crud/${router.query.slug}`);
          Router.replace(`/admin/crud/blogs`);
        } else if (isAuth() && isAuth().role === 0) {
          // Router.replace(`/user/crud/${router.query.slug}`);
          Router.replace(`/user/crud/blogs`);
        }
      }
    });
  };

  /**
   * @function showError
   * @returns {html}
   * @summary Shows an error message when a blog is not successfully updated
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
   * @summary Shows an success message when a blog is successfully updated
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
   * @function updateBlogForm
   * @returns {html}
   * @event onChange (@fires handleChange) (@fires handleBody)
   * @summary This return the Input to Enter a Blog Title and the Quill Editor
   * to update content in the blog
   */
  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
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
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb5">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">
            {showSuccess()}
            {showError()}
          </div>
          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: "100%" }}
            />
          )}
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

export default withRouter(UpdateBlog);
