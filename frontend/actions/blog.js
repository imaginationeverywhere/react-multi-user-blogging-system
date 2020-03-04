import fetch from "isomorphic-fetch";
import { API } from "../config";

/**
 * @function createBlog
 * @param {*} blog
 * @param {*} token
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
 * @param {*} skip
 * @param {*} limit
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
 * @param {*} slug
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
 * @param {*} blog
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
 * @function removeBlog
 * @param {*} slug
 * @param {*} token
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
 * @param {*} blog
 * @param {*} token
 * @param {*} slug
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
