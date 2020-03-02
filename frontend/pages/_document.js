import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * @class MyDocument
 * @summary This is Parent Container that all other pages and componets of the applicaiton
 * are placed in
 * @returns {html}
 * @author Amen Ra
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
