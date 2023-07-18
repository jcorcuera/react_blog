import React from "react";

function Comment({ comment }) {
  return (
    <li>
      <div>{comment.name}</div>
      <div>{comment.email}</div>
      <div>{comment.body}</div>
    </li>
  );
}

export default Comment;