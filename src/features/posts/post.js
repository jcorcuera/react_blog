import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchPost, selectPostById, selectPostsStatusIsLoading } from "./postsSlice";

import CommentList from "../comments/commentList"
import { Link } from "react-router-dom";

import styles from './post.module.css'

function Post() {
  const dispatch = useDispatch();

  const { id } = useParams()
  const post = useSelector((state) => selectPostById(state, id))

  useEffect(() => {
    if (!post) {
      dispatch(fetchPost(id))
    }
  }, [id, post])

  const isLoading = useSelector(selectPostsStatusIsLoading)

  if (isLoading) {
    return <div>'Loading...'</div>
  }

  if (!post) {
    return <div>404</div>
  }

  return (
    <div className={styles.post}>
      <Link to='/'>Back to Posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <CommentList postId={id} />
    </div>
  );
}

export default Post;