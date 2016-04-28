/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { createTodo, setVisibilityFilter, todoFilter, toggleTodo, fetchTodos } from '../actions/todo';
import { TodoList, AddTodo as AddTodoComp } from '../components/TodoList';

const mapDispatchToAddTodoProps = (dispatch) => ({
  onAddTodoClick: (text) => dispatch(createTodo({text}))
});
export const AddTodo = connect(null, mapDispatchToAddTodoProps)(AddTodoComp);

class Link extends Component<{
  active: boolean,
  children: any,
  onClick: () => any
}, any> {
  render() {
    const { active, children, onClick } = this.props;
    if (active) {
      return (<span>{children}</span>);
    }

    return (
      <a href="void(0)" onClick={(e) => {
        e.preventDefault();
        onClick();
      } }>{children}</a>
    );
  }
}
const mapStateToLinkProps = (state, ownProps) => {
	return {
  	active: ownProps.filter === state.visibilityFilter
  };
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
  	onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
  };
};
export const FilterLink = connect(
	mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

class Footer extends Component<{}, any> {
  render() {
    return (
      <p>
      Show:
      {" "} 
      <FilterLink 
        filter="SHOW_ALL"
      >All</FilterLink>
      {" "} 
      <FilterLink 
        filter="SHOW_ACTIVE"
      >Active</FilterLink>
      {" "} 
      <FilterLink 
        filter="SHOW_COMPLETED"
      >Completed</FilterLink>
      </p>
    );
  }
}

const mapStateToToDoListProps = (state) => {
	return {
  	todos: [...state.todo.todos.filter(todoFilter(state.visibilityFilter))],
  };
};
const mapDispatchToToDoListProps = (dispatch) => {
	return {
  	onTodoClick: id => dispatch(toggleTodo(id)),
    onMount: () => {
      console.log("onMount");
      if (!window["__INITIAL_STATE__"]["todo"]["isLoaded"])
        TodoApp["need"].forEach((val) => dispatch(val()));
    },
  };
}; 
const VisibleTodoList = connect(
	mapStateToToDoListProps,
  mapDispatchToToDoListProps
)(TodoList);

const TodoApp = () => {
  	return (
        <form onSubmit={ (e) => e.preventDefault() }>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </form>
    );
};
TodoApp["need"] = [fetchTodos];

export default TodoApp;