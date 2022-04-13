import React, { useState } from 'react';

// Insert props so TodoForm has access to the function (addTodo) from parent
const TodoForm = (props) => {
	const [todoInput, setTodoInput] = useState('');

	const handleInput = (event) => {
		setTodoInput(event.target.value);
	};

	const handleSubmit = (event) => {
		// Prevent form from trying to submit to a server (and changing the URI)
		event.preventDefault();

		// Prevent adding of empty strings and whitespaces
		if (todoInput.trim().length === 0) {
			return;
		}

		// Add function call from parent element to transfer string value
		props.addTodo(todoInput);

		// Revert to an empty string after submitting the form
		setTodoInput('');
	};

	return (
		<form action="#" onSubmit={handleSubmit}>
			<input
				type="text"
				className="todo-input"
				placeholder="Add item to the list"
				value={todoInput}
				onChange={handleInput}
			/>
		</form>
	);
};

export default TodoForm;
