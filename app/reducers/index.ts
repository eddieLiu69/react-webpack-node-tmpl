import { combineReducers } from 'redux';
import comment from './comment';
import { todos as todo, visibilityFilter } from './todo';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  comment,
  routing,
  todo,
  visibilityFilter
});

export default rootReducer;
