/// <reference path="../../typings/main.d.ts" />
import * as _ from 'lodash';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  SHOW_ALL
} from '../constants/index';

export const todo = (state, action) => {
	switch(action.type) {
  	case ADD_TODO: {
    	return {
      	id: action.id, 
        text: action.text,
        completed: false
      };
    }
    case TOGGLE_TODO: {
    	return state.id !== action.id? 
      	state: 
        _.assign({}, state, {completed: !state.completed});
    }
    default: {
    	return state;
    }
  }
};

export const todos = (state = [], action) => {
	switch(action.type) {
  	case ADD_TODO: {
    	return [...state, todo(undefined, action)];
    }
    case TOGGLE_TODO: {
    	return state.map(t => todo(t, action));
    }
    default: {
    	return state;
    }
  }
};

export const visibilityFilter = (state = SHOW_ALL, action) =>{
	switch(action.type) {
  	case SET_VISIBILITY_FILTER: {
    	return action.filter;
    }
    default: {
    	return state;
    }
  }
};
