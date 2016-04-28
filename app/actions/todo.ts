/// <reference path="../../typings/main.d.ts" />

import * as request from 'axios';
import * as types from '../constants/todo'

// let nextToDoId = 0;
// export const addTodo = (text) => {
// 	return {
//     type: types.ADD_TODO, 
//     text: text, 
//     id: nextToDoId++ 
//   }
// };

export function createTodo(todo: { text: string }) {
  return (dispatch, getState) => {
    const todoText = todo.text.trim();
    if (todoText.length === 0) return;

    const id = Date.now();
    const data = {
      id: id,
      text: todo.text
    };

    // First dispatch an optimistic update
    dispatch(createTodoRequest(data));

    request.post('/api/todos', data)
      .then(res => {
        return dispatch(createTodoSuccess());
      })
      .catch(e => {
        return dispatch(createTodoFailure(data));
      });
  };
}

function createTodoRequest(data) {
  return {
    type: types.ADD_TODO_REQUEST,
    id: data.id,
    text: data.text
  };
}

function createTodoSuccess() {
  return {
    type: types.ADD_TODO_SUCCESS
  };
}

function createTodoFailure(data) {
  return {
    type: types.ADD_TODO_FAILURE,
    id: data.id,
    error: data.error
  };
}

export const toggleTodo = (id) => {
	return {
  	type: types.TOGGLE_TODO, 
    id
  };
}; 

export function fetchTodos() {
  return {
    type: types.GET_TODOS,
    promise: request.get('/api/todos')
  };
}

export const setVisibilityFilter = (filter) => {
	return {
    type: types.SET_VISIBILITY_FILTER,
    filter
  };
};

export const todoFilter = (filter: string) => {
  switch (filter) {
    case types.SHOW_ALL: {
      return t => t;
    }
    case types.SHOW_ACTIVE: {
      return t => !t.completed;
    }
    case types.SHOW_COMPLETED: {
      return t => t.completed;
    }
  }
};