import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";
import Router from "next/router";

/**
 * @function handleResponse
 * @param {object} response
 * @fires signout @returns {void}
 * @fires removeCookie @returns {void}
 * @fires removeLocalStorage @returns {void}
 * @returns {void}
 * @summary Redirects the user to the login page when the JWT token expires
 */
export const handleResponse = response => {
  if (response.status === 401) {
    signout(() => {
      Router.push({
        pathname: "/signin",
        query: {
          message: "Your session is expired. Please signin again"
        }
      });
    });
  } else {
    return;
  }
};

/**
 * @function signup
 * @param {*} user
 * @returns {void}
 */
export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function signin
 * @param {*} user
 * @returns {void}
 */
export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

/**
 * @function signout
 * @param {*} next
 * @returns {void}
 */
export const signout = next => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/signout`, {
    method: "GET"
  })
    .then(resposne => {
      console.log("Signout success");
    })
    .catch(err => console.log(err));
};

/**
 * @function setCookie
 * @param {*} key
 * @param {*} value
 * @returns {void}
 */
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
};

/**
 * @function removeCookie
 * @param {*} key
 * @returns {void}
 */
export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

/**
 * @function getCookie
 * @param {*} key
 * @returns {String}
 */
export const getCookie = key => {
  if (process.browser) {
    return cookie.get(key);
  }
};

/**
 * @function setLocalStorage
 * @param {*} key
 * @param {*} value
 * @returns {void}
 */
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * @function removeLocalStorage
 * @param {*} key
 * @returns {void}
 */
export const removeLocalStorage = key => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

/**
 * @function authenticate
 * @param {*} data
 * @param {*} next
 * @returns {void}
 * @summary authenticate user by pass data to cookie and localstorage
 */
export const authenticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

/**
 * @function isAuth
 * @returns {boolean || string}
 * @summary show the user is logged in or is authenticated
 */
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

/**
 * @function updateUser
 * @param {object} user
 * @param {function} next
 * @returns {void}
 * @summary Updates signed in user information in localstorage
 */
export const updateUser = (user, next) => {
  if (process.browser) {
    if (localStorage.getItem("user")) {
      let auth = JSON.parse(localStorage.getItem("user"));
      auth = user;
      localStorage.setItem("user", JSON.stringify(auth));
      next();
    }
  }
};
