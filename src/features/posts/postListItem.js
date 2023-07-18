import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectPostById } from "./postsSlice";
import { selectUserById } from "../users/usersSlice";


function PostListItem({ id }) {
  const post = useSelector((state) => selectPostById(state, id))
  const user = useSelector((state) => selectUserById(state, post.userId))

  return (
    <li>
      <Link to={'/posts/' + id}>
        {post.title}
      </Link>
      <div>{user ? user.name : '...'}</div>
    </li>
  );
}

export default PostListItem