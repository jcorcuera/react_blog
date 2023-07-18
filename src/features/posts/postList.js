import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  selectFilteredPostsIds,
  selectPostsStatusIsLoading
} from "./postsSlice";
import { fetchUsers } from "../users/usersSlice";

import PostListItem from "./postListItem";

import styles from './postList.module.css'

function PostList() {
  const dispatch = useDispatch()
  const postIds = useSelector(selectFilteredPostsIds)
  const isLoading = useSelector(selectPostsStatusIsLoading)

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchPosts())
  }, [])

  const renderedPostEntries = postIds.map(postId => {
    return <PostListItem key={postId} id={postId}/>;
  });

  const postCount = postIds.length
  const postCountText = postCount === 1 ? 'Post' : 'Posts'

  return (
    <div className={styles.postList}>
      <span className={styles.postListCount}>{postCount} {postCountText}</span>
      <div className={styles.postListItems}>
        { isLoading ? 'Loading...' : <ul>{renderedPostEntries}</ul> }
      </div>
    </div>
  );
}

export default PostList;