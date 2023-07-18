import { createSelector } from "reselect"
import { client } from "../../api/client"
import { Statuses } from "../../api/statuses"
import { SortFilters } from "../filters/filtersSlice"

const initialState = {
  status: Statuses.idle,
  entities: {}
}

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case 'posts/postsLoading': {
      return {
        ...state,
        status: Statuses.loading
      }
    }
    case 'posts/postLoading': {
      return {
        ...state,
        status: Statuses.loading
      }
    }
    case 'posts/postLoaded': {
      return {
        ...state,
        status: Statuses.success,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload
        }
      }
    }
    case 'posts/postsLoaded': {
      const newEntities = {}
      action.payload.forEach(post => {
        newEntities[post.id] = post
      })
      return {
        ...state,
        status: Statuses.success,
        entities: newEntities
      }
    }
    default:
      return state
  };
}

// Action Creators

export const postsLoading = () => ({ type: 'posts/postsLoading' })
export const postLoading = () => ({ type: 'posts/postLoading' })

export const postsLoaded = (posts) => ({
  type: 'posts/postsLoaded',
  payload: posts
})

export const postLoaded = (post) => ({
  type: 'posts/postLoaded',
  payload: post
})

// Thunk functions

export const fetchPosts = () => async (dispatch) => {
  dispatch(postsLoading())
  const response = await client.get('/posts')
  dispatch(postsLoaded(response))
}

export const fetchPost = (id) => async (dispatch) => {
  dispatch(postLoading())
  const response = await client.get('/posts/' + id)
  dispatch(postLoaded(response))
}

// Selectors

const selectPostEntities = state => state.posts.entities

export const selectPostById = (state, postId) => {
  return selectPostEntities(state)[postId]
}

const selectPostsStatus = state => state.posts.status
export const selectPostsStatusIsLoading = createSelector(
  selectPostsStatus,
  (status) => status === Statuses.idle || status === Statuses.loading
)

const selectPosts = createSelector(selectPostEntities, entities => Object.values(entities))

export const selectPostIds = createSelector(
  selectPosts,
  (posts) => posts.map(post => post.id)
)

const selectFilteredPosts = createSelector(
  selectPosts,
  (state) => state.filters,
  (posts, filters) => {
    const { search, sort } = filters

    let filteredPosts = [...posts]

    if (search !== '') {
      filteredPosts = filteredPosts.filter((post) => post.title.search(search) >= 0)
    }

    if (sort === SortFilters.none) {
      return filteredPosts
    }

    return filteredPosts.sort((a, b) => {
      if (a.title < b.title) {
        return sort === SortFilters.asc ? -1 : 1
      }
      if (a.title > b.title) {
        return sort === SortFilters.asc ? 1 : -1
      }
      return 0
    })
  }
)

export const selectFilteredPostsIds = createSelector(
  selectFilteredPosts,
  (posts) => posts.map(post => post.id)
)