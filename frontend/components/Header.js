import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";
import Search from "./blog/search";
import "../node_modules/nprogress/nprogress.css";
import "../static/css/styles.css";

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

/**
 * @file Header Component
 * @function Header
 * @param {*} props
 * @returns {html}
 * @summary Renders the header compoent
 * @author Amen Ra
 * @
 */
const Header = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          {/* NavLink is an a tag from Reactstrap */}
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>Blogs</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}`}'s Dashboard</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}`}'s Dashboard</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;
