import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from "./auth";

/**
 * @function userPublicProfile
 * @param {string} username
 * @returns {JSON}
 * @summary GET Api Call to send a username parameter to the backend
 * to retrieve public profile of a user
 */
export const userPublicProfile = username => {
  return fetch(`${API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function getProfile
 * @param {string} token
 * @returns {JSON}
 * @summary GET Api Call to send a token and body parameter in the headers to the backend
 * to retrieve authenticated user profile
 */
export const getProfile = token => {
  return fetch(`${API}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function update
 * @param {string} token
 * @param {object} user
 * @returns {JSON}
 * @summary GET Api Call to send a user parameter and token in the headers to the backend
 * to update a users profile
 */
export const update = (token, user) => {
  return fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(response => {
      handleResponse(response);
      return response.json();
    })
    .catch(err => console.log(err));
};
