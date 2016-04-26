/// <reference path="../../typings/main.d.ts" />
import * as _ from 'lodash';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  SHOW_ALL,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE
} from '../constants/todo';

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    }
    case TOGGLE_TODO: {
      return state.id !== action.id ?
        state:
        _.assign({}, state, { completed: !state.completed });
    }
    default: {
      return state;
    }
  }
};

export const todos = (state = {
  todos: [],
  isFetching: false,
  isLoaded: false
}, action) => {
  const { todos, isFetching, isLoaded } = state;
  
  switch (action.type) {
    case ADD_TODO: {
      return _.assign({}, state, {
        todos: [...todos, todo(undefined, action)]
      });
    }
    case TOGGLE_TODO: {
      return _.assign({}, state, {
        todos: todos.map(t => todo(t, action))
      });
    }
    case GET_TODOS_REQUEST:
      return _.assign({}, state, {
        isFetching: true
      });
    case GET_TODOS_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        isLoaded: true,
        todos: action.req.data
      });
    case GET_TODOS_FAILURE:
      return _.assign({}, state, {
        isFetching: false
      });    
    default: {
      return state;
    }
  }
};

export const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER: {
      return action.filter;
    }
    default: {
      return state;
    }
  }
};
