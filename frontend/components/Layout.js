import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <style global jsx>{`
        a {
          cursor: pointer;
        }
      `}</style>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default Layout;
