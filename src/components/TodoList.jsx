import React from 'react';

const TodoList = (props) => {
	return (
		<ul className="todo-list">
			{props.todos.map((todo) => (
				<li className="todo-item-container" key={todo.id}>
					<div className="todo-item">
						<input
							type="checkbox"
							className="checkbox"
							// Make sure to use a callback function to avoid the deleteTodo function to run
							// when the button gets rendered (only necessary when the method/func has a parameter)
							// In this case: parameter = (todo.id)
							onChange={() => props.completeTodo(todo.id)}
							// If the todo already has isComplete=true -> make sure the checkbox will be checked
							checked={todo.isComplete ? true : false}
						/>
						{!todo.isEditing ? (
							<span
								className={`todo-item-label ${
									todo.isComplete ? 'line-through' : ''
								}`}
								onDoubleClick={() => props.editTodo(todo.id)}
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
									// Cancel editing when pressing Escape
									// TODO: Escape key returns previous value (WIP)
									else if (event.key === 'Escape') {
										props.cancelEdit(todo.id);
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
	);
};

export default TodoList;
