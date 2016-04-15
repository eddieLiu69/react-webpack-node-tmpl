/// <reference path="../../typings/main.d.ts" />
import * as _ from 'lodash';
import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_FAILURE
} from '../constants/index';

const comment = (state = {
  comments: [],
  isFetching: false,
  isLoaded: false
}, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return _.assign({}, state, {
        isFetching: true
      });
    case GET_COMMENTS_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        comments: action.req.data
      });
    case GET_COMMENTS_FAILURE:
      return _.assign({}, state, {
        isFetching: false
      });
    case CREATE_COMMENT_REQUEST:
      return _.assign({}, state, {
        comments: [...state.comments, { key: action.key, author: action.author, text: action.text }]
      });
    case CREATE_COMMENT_FAILURE:
      return _.assign({}, state, {
        comments: state.comments.filter(val => val.key !== action.key)
      });
    default:
      return state;
  }
}
export default comment;