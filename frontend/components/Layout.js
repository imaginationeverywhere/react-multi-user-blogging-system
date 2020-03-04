import Header from "./Header";

/**
 * @file Layout Component
 * @function Layout
 * @param {*} props
 * @param {props} props.children
 * @returns {<Layout />}
 * @author Amen Ra
 */
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default Layout;
