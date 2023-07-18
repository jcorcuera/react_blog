export const SortFilters = {
  none: '',
  asc: 'ascending',
  desc: 'descending'
}

const initialState = {
  sort: SortFilters.none,
  search: ''
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/searchChanged': {
      return {
        ...state,
        search: action.payload
      }
    }
    case 'filters/sortChanged': {
      return {
        ...state,
        sort: action.payload
      }
    }
    default:
      return state
  }
}

// Action Creators

export const searchChanged = (text) => ({
  type: 'filters/searchChanged',
  payload: text
})

export const sortChanged = (value) => ({
  type: 'filters/sortChanged',
  payload: value
})