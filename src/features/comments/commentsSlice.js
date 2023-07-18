import { client } from "../../api/client"
import { Statuses } from "../../api/statuses"

const initialState = {
  status: Statuses.idle,
  entities: []
}

export default function commentsReducer(state = initialState, action) {
  switch(action.type) {
    case 'comments/commentsLoading': {
      return {
        ...state,
        status: Statuses.loading
      }
    }
    case 'comments/commentsLoaded': {
      return {
        ...state,
        status: Statuses.success,
        entities: action.payload
      }
    }
    case 'comments/commentsCleared': {
      return {
        ...state,
        status: Statuses.idle,
        entities: []
      }
    }
    case 'comments/commentAdded': {
      return {
        ...state,
        entities: [
          ...state.entities,
          action.payload
        ]
      }
    }
    default:
      return state
  }
}

// Action Creators

export const commentsLoading = () => ({ type: 'comments/commentsLoading' })

export const commentsLoaded = (comments) => ({
  type: 'comments/commentsLoaded',
  payload: comments
})

export const commentAdded = (comment) => ({
  type: 'comments/commentAdded',
  payload: comment
})


// Thunk functions

export const fetchComments = (postId) => async (dispatch) => {
  dispatch(commentsLoading())
  const response = await client.get('/posts/' + postId + '/comments')
  dispatch(commentsLoaded(response))
}

export const createComment = (postId, body, onSuccess) => async (dispatch) => {
  const response = await client.post('/posts/' + postId + '/comments', body)
  dispatch(commentAdded(response))
  onSuccess()
}

// Selectors

export const selectComments = state => state.comments.entities

export const selectCommentsStatus = state => state.comments.status