import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

import Navbar from './features/navbar/navbar';
import PostList from './features/posts/postList';
import Post from './features/posts/post';
import Album from './features/album/album';
import Filters from './features/filters/filters';

import styles from './App.module.css'

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Filters />
            <PostList />
          </Route>
          <Route path='/posts/:id'>
            <Post />
          </Route>
          <Route path='/album'>
            <Album />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
