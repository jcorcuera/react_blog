import { combineReducers } from "redux"

import postsReducer from "./features/posts/postsSlice"
import filtersReducer from "./features/filters/filtersSlice"
import usersReducer from "./features/users/usersSlice";
import commentsReducer from "./features/comments/commentsSlice";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  comments: commentsReducer,
  filters: filtersReducer
})

export default rootReducer;