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
 * @returns {<Category />}
 * @author Amen Ra
 */
const Category = props => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false
  });

  const { name, error, success, categories, removed, reload } = values;
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

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

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

  const deleteConfirm = slug => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

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

  const handleChange = e => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: ""
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
    }
  };

  const mouseMoveHandler = e => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

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
