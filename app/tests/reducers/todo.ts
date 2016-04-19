/// <reference path="../../../typings/main.d.ts" />
import * as _ from 'lodash';
import * as deepFreeze from 'deep-freeze';
import { todos } from '../../reducers/todo.ts';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  SHOW_ALL
} from '../../constants/index';

const expect = require('expect');

describe('todo', () => {
  it('add todo', () => {
    const stateBefore = [
      {      
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Learn Redux1',
        completed: false
      }
    ];
    const action = {
      type: 'ADD_TODO',
      id: 2,
      text: 'Learn Redux2',
      completed: false
    };
    const stateAfter = [
      {      
        id: 0,
        text: 'Learn Redux',
        completed: false
      },
      {
        id: 1,
        text: 'Learn Redux1',
        completed: false
      },
      {
        id: 2,
        text: 'Learn Redux2',
        completed: false
      }
    ];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
  
  it("toggle todo", () =>{
    const stateBefore = [
      {id: 0, text: 'Learn Redux 0', completed: false},
      {id: 1, text: 'Learn Redux 1', completed: false},
      {id: 2, text: 'Learn Redux 2', completed: false},
      {id: 3, text: 'Learn Redux 3', completed: false}
    ];
    
    const action = {
      type: 'TOGGLE_TODO',
      id: 2
    };
    
    const stateAfter = [
      {id: 0, text: 'Learn Redux 0', completed: false},
      {id: 1, text: 'Learn Redux 1', completed: false},
      {id: 2, text: 'Learn Redux 2', completed: true},
      {id: 3, text: 'Learn Redux 3', completed: false}
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});


