import Navbar from "./Navbar";

const HomeLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

export default HomeLayout;
