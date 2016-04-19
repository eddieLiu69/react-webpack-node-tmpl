// /// <reference path="../../typings/main.d.ts" />

// import * as React from 'react';

// class TodoList extends Component {
// 	render() {
//   	//console.log(`debug todoList: ${JSON.stringify(this.props)}`);
//     const {onTodoClick, todos} = this.props;
//   	return (
//     	<ul>
//         {todos.map(todo => <Todo 
//         	{...todo} 
//           key={todo.id} 
//           onClick={ () => onTodoClick(todo.id) } /> )}
//       </ul>
//     );
//   }
// }