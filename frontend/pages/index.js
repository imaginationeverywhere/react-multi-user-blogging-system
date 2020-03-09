import Layout from "../components/Layout";

/**
 * @file Site Home Page
 * @function Index
 * @param {object} props
 * @requires Layout
 * @returns {html}
 * @summary This is the default page of the website {@link http(s)://baseUrl:3085}
 * @author Amen Ra
 */
const Index = props => {
  return (
    <Layout>
      <h2>Home Page</h2>
    </Layout>
  );
};

export default Index;
