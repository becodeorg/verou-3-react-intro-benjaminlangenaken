import React from 'react';
import PropTypes from 'prop-types';
import CheckAllTodos from './CheckAllTodos';
import TodoFilters from './TodoFilters';

const TodoList = (props) => {
	const handleEscape = (id) => {
		props.cancelEdit(id);
	};

	return (
		// Add parent element <> (empty tags) for when we will add more elements inside the condition
		// Otherwise React will trow an error
		<>
			<ul className="todo-list">
				{props.todosFiltered(props.filter).map((todo) => (
					<li className="todo-item-container" key={todo.id}>
						<div className="todo-item">
							<input
								type="checkbox"
								className="checkbox"
								// Make sure to use a callback function to avoid the deleteTodo function to run
								// when the button gets rendered (only necessary when the method/func has a parameter)
								// In this case: parameter = (todo.id)
								onChange={() => props.completeTodo(todo.id)}
								// If the todo already has isComplete = true -> make sure the checkbox will be checked
								checked={todo.isComplete ? true : false}
							/>
							{/*Make input field visible instead of <span> on double click <span> element*/}
							{!todo.isEditing ? (
								<span
									className={`todo-item-label ${
										todo.isComplete ? 'line-through' : ''
									}`}
									onDoubleClick={() =>
										props.editTodo(todo.id)
									}
								>
									{todo.title}
								</span>
							) : (
								<input
									type="text"
									className="todo-item-input"
									// Make sure we can type inside the input field:
									// --> Use defaultValue instead of value for our title element
									defaultValue={todo.title}
									autoFocus
									// Commit new values when clicking outside of input field
									onBlur={(event) =>
										props.updateTodo(event, todo.id)
									}
									onKeyDown={(event) => {
										//Commit new values when pressing Enter
										if (event.key === 'Enter') {
											props.updateTodo(event, todo.id);
										}
										// Cancel editing when pressing Escape (return previous value)
										else if (event.key === 'Escape') {
											handleEscape(todo.id);
										}
									}}
								/>
							)}
						</div>
						<button
							className="x-button"
							onClick={() => props.deleteTodo(todo.id)}
						>
							<svg
								className="x-button-icon"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</li>
				))}
			</ul>

			{/*Prop drilling from higher-level component to lower-level component*/}
			<CheckAllTodos
				remainingTodos={props.remainingTodos}
				completeAllTodos={props.completeAllTodos}
			/>

			<div className="other-buttons-container">
				<TodoFilters
					filter={props.filter}
					setFilter={props.setFilter}
				/>

				<div>
					<button onClick={props.clearCompleted} className="button">
						Clear completed
					</button>
				</div>
			</div>
		</>
	);
};

// Make sure the correct prop type will be used thanks to propTypes package
TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	completeTodo: PropTypes.func.isRequired,
	editTodo: PropTypes.func.isRequired,
	updateTodo: PropTypes.func.isRequired,
	cancelEdit: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	remainingTodos: PropTypes.number.isRequired,
	completeAllTodos: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
};

export default TodoList;
