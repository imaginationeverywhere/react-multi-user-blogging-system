import { useState, useEffect } from "react";
import { getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

/**
 * @file Category Compoent
 * @function Category
 * @external useEffect
 * @external useState
 * @param {*} props
 * @requires getCookie
 * @requires create
 * @requires getCategories
 * @requires removeCategory
 * @returns {<Category />}
 * @summary This component is used on the Manage Categories and Tags Page
 * {@link frontend/pages/admin/crud/category-tag.js}
 * @returns {html}
 * @author Amen Ra
 */
const Category = props => {
  /**
   * @constant {function} useState @returns {void}
   * @type {object} @var values
   * @type {function} @function setValues @returns {void}
   */
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  /**
   * @constant {object} values
   * @type {string} @var name
   * @type {boolean} @var error
   * @type {boolean} @var success
   * @type {array} @var categories
   * @type {boolean} @var removed
   * @type {boolean} @var reload
   */
  const { name, error, success, categories, removed, reload } = values;

  /**
   * @constant {function} token
   * @fires getCookie @param {string}
   */
  const token = getCookie("token");

  /**
   * @external useEffect
   * @fires loadCategories
   * @returns {void}
   * @description Accepts a function that contains imperative, possibly effectful code.
   * @param effect — Imperative function that can return a cleanup function
   * @param deps — If present, effect will only activate if the values in the list change.
   * @version — 16.8.0
   * @see — https://reactjs.org/docs/hooks-reference.html#useeffect
   * @summary This fires when the compoennt is mounted and loads a list of categories.
   */
  useEffect(() => {
    loadCategories();
  }, [reload]);

  /**
   * @function loadCategories
   * @fires getCategories
   * @returns {void}
   */
  const loadCategories = () => {
    /**
     * @function getCategories
     * @fires setValues
     * @returns {void}
     */
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  /**
   * @function showCategories
   * @event onClick @fires deleteConfirm
   * @returns {html}
   * @summary Displays a button for every category that exists in the database
   */
  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };

  /**
   * @function deleteConfirm
   * @param {string} slug
   * @fires deleteCategory (@param {string} slug)
   * @returns {void}
   */
  const deleteConfirm = slug => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  /**
   * @function deleteCategory
   * @param {string} slug
   * @fires removeCategory (
   *  @param {string} slug
   *  @param {string} token
   *  @fires setValues (
   *    @returns {void}
   *  )
   * )
   * @returns {void}
   */
  const deleteCategory = slug => {
    // console.log('delete', slug);
    removeCategory(slug, token).then(data => {
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
      return <p className="text-success">Category is created</p>;
    }
  };

  /**
   * @function showError
   * @returns {html}
   */
  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist</p>;
    }
  };

  /**
   * @function showRemoved
   * @returns {html}
   */
  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
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
   * @function newCategoryForm
   * @returns {html}
   * @event onSubmit @fires clickSubmit
   * @event onChange @fires handleChange
   */
  const newCategoryForm = () => (
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
        <button type="submit" className="btn btn-outline-primary">
          Create Category
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
        {newCategoryForm()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default Category;
