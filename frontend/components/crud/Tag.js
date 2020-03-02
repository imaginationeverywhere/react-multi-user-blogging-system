import { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { create, getTags, removeTag } from "../../actions/tag";

/**
 * @file Tag Component
 * @function Tag
 * @external useEffect
 * @external useState
 * @param {*} props
 * @requires getCookie
 * @requires create
 * @requires getTags
 * @requires removeTag
 * @returns {html}
 * @summary This component is used on the Manage Categories and Tags Page
 * {@link frontend/pages/admin/crud/category-tag.js}
 * @author Amen Ra
 */
const Tag = props => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false
  });

  /**
   * @constant {object} values
   * @type {string} @var name
   * @type {boolean} @var error
   * @type {boolean} @var success
   * @type {array} @var tags
   * @type {boolean} @var removed
   * @type {boolean} @var reload
   */
  const { name, error, success, tags, removed, reload } = values;

  /**
   * @constant {function} token
   * @fires getCookie @param {string}
   */
  const token = getCookie("token");

  /**
   * @external useEffect
   * @fires loadTags
   * @returns {void}
   * @description Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   * @version — 16.8.0
   * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   * @summary This fires when the compoennt is mounted and loads a list of tags.
   */
  useEffect(() => {
    loadTags();
  }, [reload]);

  /**
   * @function loadTags
   * @fires getCategories
   * @returns {void}
   */
  const loadTags = () => {
    /**
     * @function getTags
     * @fires setValues
     * @returns {void}
     */
    getTags().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  /**
   * @function showTags
   * @event onClick @fires deleteConfirm
   * @returns {html}
   * @summary Displays a button for every tag that exists in the database
   */
  const showTags = () => {
    return tags.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };

  /**
   * @function deleteConfirm
   * @param {string} slug
   * @fires deleteTag (@param {string} slug)
   * @returns {void}
   */
  const deleteConfirm = slug => {
    let answer = window.confirm("Are you sure you want to delete this tag?");
    if (answer) {
      deleteTag(slug);
    }
  };

  /**
   * @function deleteTag
   * @param {string} slug
   * @fires removeTag (
   *  @param {string} slug
   *  @param {string} token
   *  @fires setValues (
   *    @returns {void}
   *  )
   * )
   * @returns {void}
   */
  const deleteTag = slug => {
    // console.log('delete', slug);
    removeTag(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload
        });
      }
    });
  };

  /**
   * @function clickSubmit
   * @param {event} e
   * @fires preventDefault
   * @fires create (
   *  @param {object} name
   *  @param string
   *  @fires setValues (
   *    @returns {void}
   *  )
   * )
   * @returns {void}
   */
  const clickSubmit = e => {
    e.preventDefault();
    // console.log('create category', name);
    create({ name }, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: false,
          reload: !reload
        });
      }
    });
  };

  /**
   * @function handleChange
   * @fires setValues (
   *  @returns {void}
   * )
   * @param {event} e
   */
  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: ""
    });
  };

  /**
   * @function showSuccess
   * @returns {html}
   */
  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  /**
   * @function showError
   * @returns {html}
   */
  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exist</p>;
    }
  };

  /**
   * @function showRemoved
   * @returns {html}
   */
  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>;
    }
  };

  /**
   * @function mouseMoveHandler
   * @param {event} e
   * @fires setValues (
   *  @returns {void}
   * )
   * @returns {void}
   */
  const mouseMoveHandler = e => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  /**
   * @function newTagForm
   * @returns {html}
   * @event onSubmit @fires clickSubmit
   * @event onChange @fires handleChange
   */
  const newTagForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Create Tag
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </React.Fragment>
  );
};

export default Tag;
