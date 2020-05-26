import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
// import NProgress from 'nprogress';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   Nav,
//   NavItem,
//   NavLink,
//   NavbarBrand
// } from "reactstrap";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
// import "../node_modules/nprogress/nprogress.css";
// import "../static/css/styles.css";

// Router.onRouteChangeStart = url => NProgress.start();
// Router.onRouteChangeComplete = url => NProgress.done();
// Router.onRouteChangeError = url => NProgress.done();

const Header = () => {


  return (
    <div>
    </div>
  );
};

export default Header;
