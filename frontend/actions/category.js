import fetch from "isomorphic-fetch";
import { API } from "../config";

/**
 * @function create
 * @param {string} category
 * @param {string} token
 * @returns {JSON}
 * @summary A POST api call to send data to the backend to create a category
 */
export const create = (category, token) => {
  return fetch(`${API}/category`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function getCategores
 * @returns {JSON}
 * @summary GET Api call to categories endpoint
 */
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function singleCategory
 * @param {string} slug
 * @returns {JSON}
 * @summary  GET Api call to category endpoint with the slug name
 */
export const singleCategory = slug => {
  return fetch(`${API}/category/${slug}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function removeCategory
 * @param {string} slug
 * @param {string} token
 * @returns {JSON}
 * @summary A DELETE api call to the backend to delete a category
 */
export const removeCategory = (slug, token) => {
  return fetch(`${API}/category/${slug}`, {
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
