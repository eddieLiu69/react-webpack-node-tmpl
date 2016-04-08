import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

// import App from './containers/App';
// import Vote from 'containers/Vote';
// import About from 'containers/About';
// import LoginOrRegister from 'containers/LoginOrRegister';
// import Dashboard from 'containers/Dashboard';
import App from './components/App';
import About from './components/About';
import Repos from './components/Repos';
import Repo from './components/Repo';
import Home from './components/Home';
import CommentBox from './components/CommentBox';
import FilterableProductTable from './components/Product';

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
    // <Route path="/" component={App}>
    //   <IndexRoute component={Vote} />
    //   <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
    //   <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    //   <Route path="about" component={About} />
    // </Route>      
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
        </Route>
        <Route path="/about" component={About}/>
        <Route path="/comments" component={CommentBox}/>
        <Route path="/products" component={FilterableProductTable}/>
    </Route>
  );
};
