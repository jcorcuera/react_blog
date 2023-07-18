import { client } from "../../api/client"
import { Statuses } from "../../api/statuses"

const initialState = {
  status: Statuses.idle,
  entities: {}
}

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case 'users/usersLoading': {
      return {
        ...state,
        status: Statuses.loading
      }
    }
    case 'users/usersLoaded': {
      const newEntities = {}
      action.payload.forEach(user => {
        newEntities[user.id] = user
      })
      return {
        ...state,
        status: Statuses.idle,
        entities: newEntities
      }
    }
    default:
      return state
  };
}

// Action Creators

export const usersLoading = () => ({ type: 'users/usersLoading' })

export const usersLoaded = (users) => ({
  type: 'users/usersLoaded',
  payload: users
})

// Thunk functions

export const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading())
  const response = await client.get('/users')
  dispatch(usersLoaded(response))
}

// Selectors

const selectUserEntities = state => state.users.entities

export const selectUserById = (state, userId) => {
  return selectUserEntities(state)[userId]
}