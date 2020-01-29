import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";

const ReadBlogs = () => {
    return (
        <React.Fragment>
            <p>Update Delete Blogs</p>
        </React.Fragment>
    )
}

export default ReadBlogs;
