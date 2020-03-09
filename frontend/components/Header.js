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
 * @param {object} props
 * @returns {html}
 * @summary Renders the header compoent
 * @author Amen Ra
 * @
 */
const Header = props => {
  /**
   * @constant {function} useState
   * @type {boolean} @var isOpen
   * @type {function} @var setOpen @param {boolean} isOpen
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * @function toggle
   * @fires setOpen @param {boolean} isOpen
   * @returns {void}
   */
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
              <NavItem>
                <Link href="/contact">
                  <NavLink>Contact</NavLink>
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
                <NavItem>
                  <Link href="/user/crud/blog">
                    <NavLink className="btn btn-primary text-white">
                      Write A Post
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <React.Fragment>
                <NavItem>
                  <Link href="/user">
                    <NavLink>{`${isAuth().name}`}'s Dashboard</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/user/crud/blog">
                    <NavLink className="btn btn-primary text-white">
                      Write A Post
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 1 && (
              <React.Fragment>
                <NavItem>
                  <Link href="/admin">
                    <NavLink>{`${isAuth().name}`}'s Dashboard</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/admin/crud/blog">
                    <a className="btn btn-primary text-white">Write A Post</a>
                  </Link>
                </NavItem>
              </React.Fragment>
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
