import fetch from "isomorphic-fetch";
import { API } from "../config";

/**
 * @function userPublicProfile
 * @param {string} username
 * @returns {void}
 * @summary GET Api Call to send a username parameter to the backend
 * to retrieve
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
