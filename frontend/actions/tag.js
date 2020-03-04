import fetch from "isomorphic-fetch";
import { API } from "../config";

/**
 * @function create
 * @param {string} tag
 * @param {string} token
 * @returns {JSON}
 * @summary A POST api call to the backend to create a tag
 */
export const create = (tag, token) => {
  return fetch(`${API}/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(tag)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function getTags
 * @returns {JSON}
 * @summary A GET api call to the backend to get all the tags stored in the database
 */
export const getTags = () => {
  return fetch(`${API}/tags`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function singleTag
 * @param {string} slug
 * @returns {JSON}
 * @summary A GET api call to the backend to get a single tag endpoint
 */
export const singleTag = slug => {
  return fetch(`${API}/tag/${slug}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function removeTag
 * @param {string} slug
 * @param {string} token
 * @returns {JSON}
 * @summary A DELETE api call to the backend to delete a tag
 */
export const removeTag = (slug, token) => {
  return fetch(`${API}/tag/${slug}`, {
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
