/// <reference path="../../typings/main.d.ts" />

import * as request from 'axios';
import {
  ADD_TODO,
  TOGGLE_TODO,
  GET_TODOS,
  SET_VISIBILITY_FILTER,
  SHOW_ALL, 
  SHOW_ACTIVE, 
  SHOW_COMPLETED
} from '../constants/todo'

let nextToDoId = 0;
export const addTodo = (text) => {
	return {
    type: ADD_TODO, 
    text: text, 
    id: nextToDoId++ 
  }
};

export const toggleTodo = (id) => {
	return {
  	type: TOGGLE_TODO, 
    id
  };
}; 

export function fetchTodos() {
  return {
    type: GET_TODOS,
    promise: request.get('/api/todos')
  };
}

export const setVisibilityFilter = (filter) => {
	return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
};

export const todoFilter = (filter: string) => {
  switch (filter) {
    case SHOW_ALL: {
      return t => t;
    }
    case SHOW_ACTIVE: {
      return t => !t.completed;
    }
    case SHOW_COMPLETED: {
      return t => t.completed;
    }
  }
};