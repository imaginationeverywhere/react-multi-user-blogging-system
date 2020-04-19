const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: "Teksystems Blog",
    API_DEVELOPMENT: "http://localhost:8086/api",
    API_PRODUCTION: "https://api.teksystemscms.com",
    PRODUCTION: false,
    DOMAIN_DEVELOPMEWNT: "http://localhost:3086",
    DOMAIN_PRODUCTION: "https://teksystemscms.com",
    FB_APP_ID: "168041061141989",
    DISQUS_SHORTNAME: "diversity-developers",
    GOOGLE_CLIENT_ID:
      "59757125982-qcq5rbafihif2jr1j53kp0gbf8q7sqnm.apps.googleusercontent.com"
  }
});
