import Header from "./Header";

/**
 * @file Layout Component
 * @function Layout
 * @param {object} props
 * @param {object} props.children
 * @returns {html}
 * @summary Renders the Layout compoent
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
