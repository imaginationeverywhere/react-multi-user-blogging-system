import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";

/**
 * @function createBlog
 * @param {object} blog
 * @param {string} token
 * @returns {JSON}
 * @summary POST Api Call to send data to the backend
 * to create a blog
 */
export const createBlog = (blog, token) => {
  return fetch(`${API}/blog`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function listBlogsWIthCategoriesAndTags
 * @param {number} skip
 * @param {number} limit
 * @returns {JSON}
 * @summary POST Api Call to the backend to get all categories and tags
 */
export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip
  };
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function SingleBlog
 * @param {string} slug
 * @returns {JSON}
 * @summary GET Api Call to the backend to get a single blog based on slug name
 */
export const singleBlog = slug => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function listRelated
 * @param {string} blog
 * @returns {JSON}
 * @summary GET Api Call to the backend to get all blog
 */
export const listRelated = blog => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(blog)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function list
 * @returns {JSON}
 * @summary GET Api Call to get all blogs
 */
export const list = () => {
  return fetch(`${API}/blogs`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function listSearch
 * @param params
 * @returns {JSON}
 * @summary GET Api call to the backend where parameters are sent to get blogs return
 * given what parameters are provided in the query which can be about the title or
 * anything in the body
 */
export const listSearch = params => {
  console.log("search param", params);
  /**
   * @description What the query will look like
   * @example http://localhost:3085/blogs/search?limit:100&pagination:10
   */
  let query = queryString.stringify(params);
  console.log("query param", params);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function removeBlog
 * @param {string} slug
 * @param {string} token
 * @returns {JSON}
 * @summary DELETE Api Call to the backend to delete an individual blog
 */
export const removeBlog = (slug, token) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function updateBlog
 * @param {object} blog
 * @param {string} token
 * @param {string} slug
 * @returns {void}
 * @summary PUT Api Call to send data the backend to update a single blog
 */
export const updateBlog = (blog, token, slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: blog
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
