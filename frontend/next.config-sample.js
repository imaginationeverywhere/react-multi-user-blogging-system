const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: "DiversityBlog",
    API_DEVELOPMENT: "http://localhost:8085/api",
    API_PRODUCTION: "https://imaginationeverywhere.info",
    PRODUCTION: false,
    DOMAIN_DEVELOPMEWNT: "http://localhost:3085",
    DOMAIN_PRODUCTION: "http://imaginationeverywhere.info",
    FB_APP_ID: "168041061141989",
    DISQUS_SHORTNAME: "diversity-developers",
    GOOGLE_CLIENT_ID:
      "59757125982-qcq5rbafihif2jr1j53kp0gbf8q7sqnm.apps.googleusercontent.com"
  }
});
