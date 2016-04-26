/// <reference path="../../typings/main.d.ts" />

import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, setVisibilityFilter, todoFilter, toggleTodo } from '../actions/todo';
import { TodoList, AddTodo as AddTodoComp } from '../components/TodoList';

const mapDispatchToAddTodoProps = (dispatch) => ({
  onAddTodoClick: (text) => dispatch(addTodo(text))
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
  	todos: [...state.todos.filter(todoFilter(state.visibilityFilter))],
  };
};
const mapDispatchToToDoListProps = (dispatch) => {
	return {
  	onTodoClick: id => dispatch(toggleTodo(id))
  };
}; 
const VisibleTodoList = connect(
	mapStateToToDoListProps,
  mapDispatchToToDoListProps
)(TodoList);

const TodoApp = () => {
  	//console.log(`Current state: ${JSON.stringify(this.props)}`);
  	return (
        <form onSubmit={ (e) => e.preventDefault() }>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </form>
    );
};
export default TodoApp;