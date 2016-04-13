// import * as es6 from 'es6-promise';
import * as request from 'axios';
import * as types from '../constants/index';

// polyfill();
function createCommentRequest(data) {
  return {
    type: types.CREATE_COMMENT_REQUEST,
    key: data.id,
    author: data.author,
    text: data.text
  };
}

function createCommentSuccess() {
  return {
    type: types.CREATE_COMMENT_SUCCESS
  };
}

function createCommentFailure(data) {
  return {
    type: types.CREATE_COMMENT_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createComment(comment: { author: string, text: string }) {
  return (dispatch, getState) => {
    if (comment.author.trim().length === 0 || comment.text.trim().length === 0) return;

    const id = Date.now();
    const data = {
      id: id,
      author: comment.author,
      text: comment.text
    };

    // First dispatch an optimistic update
    dispatch(createCommentRequest(data));

    request.post('/api/comments', data)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createCommentSuccess());
        }
      })
      .catch(e => {
        return dispatch(createCommentFailure(data));
      });
  };
}

export function fetchComments() {
  return {
    type: types.GET_COMMENTS,
    promise: request.get('/api/comments')
  };
}