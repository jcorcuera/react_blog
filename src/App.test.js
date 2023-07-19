import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter as Router } from 'react-router-dom';

import postsReducer from './features/posts/postsSlice';
import usersReducer from './features/users/usersSlice';
import commentsReducer from './features/comments/commentsSlice';
import filtersReducer from './features/filters/filtersSlice';

import App from './App';

import { client }  from './api/client';

jest.mock('./api/client')

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
    filters: filtersReducer}
})

describe('App', () => {
  beforeEach(() => {
    client.get.mockImplementation((path) => {
      if (path === '/posts') {
        return [
          {id: 1, title: 'b foo', body: 'b bar', userId: 4},
          {id: 2, title: 'c foo', body: 'c bar', userId: 4},
          {id: 3, title: 'a foo', body: 'a bar', userId: 4}
        ]
      }

      if (path === '/users') {
        return [
          {id: 4, name: 'user a', username: 'abc', email: 'my@email.com'}
        ]
      }
    });
  })

  test('renders posts', async () => {
    render(<Provider store={store}><Router><App /></Router></Provider>);

    await waitFor(() => {
      const linkElement = screen.getByText('3 Posts');
      expect(linkElement).toBeInTheDocument();
    });
  });

  test('sort alphabetically ascending', async () => {
    render(<Provider store={store}><Router><App /></Router></Provider>);

    await act(async () => {
      userEvent.selectOptions(screen.getByTestId('sorting-select-testid'), ['ascending'])
    });

    const postsElements = screen.getAllByText(/foo/)
    expect(postsElements[0]).toHaveTextContent("a foo");
    expect(postsElements[1]).toHaveTextContent("b foo");
    expect(postsElements[2]).toHaveTextContent("c foo");
  });

  test('sort alphabetically descending', async () => {
    render(<Provider store={store}><Router><App /></Router></Provider>);

    await act(async () => {
      userEvent.selectOptions(screen.getByTestId('sorting-select-testid'), ['descending'])
    });

    const postsElements = screen.getAllByText(/foo/)
    expect(postsElements[0]).toHaveTextContent("c foo");
    expect(postsElements[1]).toHaveTextContent("b foo");
    expect(postsElements[2]).toHaveTextContent("a foo");
  });
});