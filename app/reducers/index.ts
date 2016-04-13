import { combineReducers } from 'redux';
import user from './user';
import topic from './topic';
import comment from './comment';
import message from './message';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  topic,
  comment,
  message,
  routing
});

export default rootReducer;
