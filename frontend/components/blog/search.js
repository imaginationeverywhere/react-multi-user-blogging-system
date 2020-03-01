import Link from "next/link";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: ""
  });

  const { search, results, searched, message } = values;

  /**
   * @function searchSubmit
   * @param {function} e
   */
  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`
      });
    });
  };

  /**
   * @function handleChange
   * @param {function} e event
   * @method setValues React Hook
   * @summary Getting values as they are entered into inputs on the page
   * @return {void}
   */
  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: []
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && (
          <div className="pt-4 test-muted font-italic">{message}</div>
        )}

        {results.map((blog, i) => (
          <div key={i}>
            <Link href={`/blogs/${blog.slug}`}>
              <a className="text-primary">{blog.title}</a>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  /**
   * @function searchForm
   * @returns {*}
   */
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Search blogs"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: "-120px", marginBottom: "-80px" }}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};
export default Search;
