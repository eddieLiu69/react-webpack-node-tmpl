import {
  ADD_TODO,
  TOGGLE_TODO,
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