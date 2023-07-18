import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router } from 'react-router-dom';

import postsReducer from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';
import commentsReducer from './features/comments/commentsSlice';
import filtersReducer from './features/filters/filtersSlice';

import { client }  from './api/client'

import App from './App';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
    filters: filtersReducer}
})

//jest.mock('./api/client')

test('renders posts', async () => {
  //client.mockImplementation(() => { return { get: [] } });
  render(<Provider store={store}><Router><App /></Router></Provider>);
  const linkElement = screen.getByText(/0 Posts/i);
  expect(linkElement).toBeInTheDocument();
});
