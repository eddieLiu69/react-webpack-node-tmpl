import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import About from './components/About';
import Repos from './components/Repos';
import Repo from './components/Repo';
import Home from './components/Home';
import CommentBoard from './containers/Comment';
import FilterableProductTable from './components/Product';
import TodoApp from './containers/Todo';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
//   const requireAuth = (nextState, replace, callback) => {
//     const { user: { authenticated }} = store.getState();
//     if (!authenticated) {
//       replace({
//         pathname: '/login',
//         state: { nextPathname: nextState.location.pathname }
//       });
//     }
//     callback();
//   };

//   const redirectAuth = (nextState, replace, callback) => {
//     const { user: { authenticated }} = store.getState();
//     if (authenticated) {
//       replace({
//         pathname: '/'
//       });
//     }
//     callback();
//   };

  return (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
        <Route path="/comments" component={CommentBoard}/>
        <Route path="/products" component={FilterableProductTable}/>
        <Route path="/todos" component={TodoApp}/>
    </Route>
  );
};
