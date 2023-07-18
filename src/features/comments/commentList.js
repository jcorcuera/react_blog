import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchComments, selectComments, selectCommentsStatus } from "../comments/commentsSlice";
import { Statuses } from "../../api/statuses";

import Comment from "./comment";
import AddComment from "./addComment";

import styles from './comments.module.css'

function CommentList({ postId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId))
  }, [postId])

  const comments = useSelector(selectComments)
  const commentsStatus = useSelector(selectCommentsStatus)
  const isLoading = commentsStatus === Statuses.loading || commentsStatus === Statuses.idle

  const renderedComments = comments.map((comment) => {
    return <Comment key={comment.id} comment={comment} />
  })

  const commentsCount = comments.length
  const commentsCountText = commentsCount === 1 ? 'Comment' : 'Comments'

  if (isLoading) {
    return <div>'Loading...'</div>
  }

  return (
    <div>
      <div className={styles.commentsCount}>{commentsCount} {commentsCountText}</div>
      <ul className={styles.commentsListItem}>{renderedComments}</ul>
      <AddComment postId={postId}/>
    </div>
  );
}

export default CommentList;