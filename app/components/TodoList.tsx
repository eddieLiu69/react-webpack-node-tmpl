/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import { Component } from 'react';

export class Todo extends Component<{ onClick: Function, completed: boolean, text: string }, any> {
  render() {
    const { onClick, completed, text } = this.props;
    return (
      <li onClick={onClick} style={{ cursor: "pointer", textDecoration: completed ? "line-through" : "none" }}>
        {text}
      </li>
    );
  }
}

export class TodoList extends Component<{
  onTodoClick: (id) => any,
  onMount: () => void,
  todos: any[]
}, any> {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const {onTodoClick, todos} = this.props;
    return (
      <ul>
        {todos.map(todo => <Todo
          {...todo}
          key={todo.id}
          onClick={ () => onTodoClick(todo.id) } />) }
      </ul>
    );
  }
}

export class AddTodo extends Component<{ onAddTodoClick: (text: string) => any }, any> {
  render() {
    const { onAddTodoClick } = this.props;
    let input;
    return (
      <div>
        <input ref={ inp => input = inp }/>
        <button onClick={
          () => {
            onAddTodoClick(input.value);
            input.value = '';
          } }>Add Todo</button>
      </div>
    );
  }
}
