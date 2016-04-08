// import { polyfill } from 'es6-promise';
import * as request from 'axios';
import * as types from '../constants/index';

// polyfill();

export function fetchComments() {
    // return request.get('/api/comments');
    return {
        type: types.GET_COMMENTS,
        promise: request.get('/api/comments')
    };
}