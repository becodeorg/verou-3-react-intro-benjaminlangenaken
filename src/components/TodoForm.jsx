import React, {useContext, useEffect, useRef, useState} from 'react';
// import PropTypes from 'prop-types';
import {TodosContext} from '../context/TodosContext';

// Insert props so TodoForm has access to the function (addTodo) from parent (OLD)
// Props can be removed by using useContext
const TodoForm = () => {
	const {todos, setTodos, todoId, setTodoId} = useContext(TodosContext);

	const todoInputElement = useRef(null);

	// UseEffect runs based on the chosen dependencies:
	// Ex: [todos], only run when todos get updated
	// Ex: [], only run when the component mounts
	// In the code below we focus
	useEffect(() => {
		todoInputElement.current.focus();
	}, []);

	const [todoInput, setTodoInput] = useState('');

	const handleInput = (event) => {
		setTodoInput(event.target.value);
	};

	// const handleSubmit = (event) => {
	const addTodo = (event) => {
		// Prevent form from trying to submit to a server (and changing the URI)
		event.preventDefault();

		// Prevent adding of empty strings and whitespaces
		if (todoInput.trim().length === 0) {
			return;
		}

		// Add function call from parent element to transfer string value (OLD)
		// props.addTodo(todoInput);

		setTodos([
			// Use spread operator (...todos) inside the array to add on new value after the already existing ones
			// Similar to array.push
			...todos,
			{
				id: todoId,
				title: todoInput,
				isComplete: false,
				// Add isEditing property to make input field visible instead of <span> element
				isEditing: false,
			},
		]);

		// Increment our id after each addition
		setTodoId((prevTodoId) => prevTodoId + 1);

		// Revert to an empty string after submitting the form
		setTodoInput('');
	};

	return (
		// <form action="#" onSubmit={handleSubmit}>
		<form action="#" onSubmit={addTodo}>
			<input
				type="text"
				className="todo-input"
				placeholder="Add item to the list"
				value={todoInput}
				onChange={handleInput}
				// Add useRef hook to reference the name input field/DOM element
				// Example usage: Add button with onClick={() => todoInputElement.current.focus()} --> focus the input field
				ref={todoInputElement}
			/>
		</form>
	);
};

// Make sure the correct prop type will be used thanks to propTypes package (OLD)
// Error example:
// Warning: Failed prop type: Invalid prop `addTodo` of type `string` supplied to `TodoForm`, expected `function`
// TodoForm.propTypes = {
// 	addTodo: PropTypes.func.isRequired,
// };

export default TodoForm;
