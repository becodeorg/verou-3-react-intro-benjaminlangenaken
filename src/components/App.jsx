import { useState } from 'react';
import '../App.css';

function App() {
	const [todos, setTodos] = useState([
		{
			id: 1,
			title: 'Example item 1',
			isComplete: false,
			isEditing: false,
		},
		{
			id: 2,
			title: 'Example item 2',
			isComplete: true,
			isEditing: false,
		},
	]);

	const [todoInput, setTodoInput] = useState('');
	const [todoId, setTodoId] = useState(3);

	const handleInput = (event) => {
		setTodoInput(event.target.value);
	};

	const addTodo = (event) => {
		// Prevent form from trying to submit to a server (and changing the URI)
		event.preventDefault();

		// Prevent adding of empty strings and whitespaces
		if (todoInput.trim().length === 0) {
			return;
		}

		setTodos([
			...todos,
			{
				id: todoId,
				title: todoInput,
				isComplete: false,
				isEditing: false,
			},
		]);

		// Revert to an empty string after submitting the form
		setTodoInput('');
		// Increment our id after each addition
		setTodoId((prevTodoId) => prevTodoId + 1);
	};

	const deleteTodo = (id) => {
		setTodos([...todos].filter((todo) => id !== todo.id));
	};

	const completeTodo = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const editTodo = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isEditing = true;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const updateTodo = (event, id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				// Prevent adding of empty strings and whitespaces
				if (event.target.value.trim().length === 0) {
					todo.isEditing = false;
					return todo;
				}
				todo.title = event.target.value;
				todo.isEditing = false;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const cancelEdit = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isEditing = false;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<div className="todo-app-container">
			<div className="todo-app">
				<h2>Todo App</h2>
				<form action="#" onSubmit={addTodo}>
					<input
						type="text"
						className="todo-input"
						placeholder="Add item to the list"
						value={todoInput}
						onChange={handleInput}
					/>
				</form>
				<ul className="todo-list">
					{todos.map((todo) => (
						<li className="todo-item-container" key={todo.id}>
							<div className="todo-item">
								<input
									type="checkbox"
									className="checkbox"
									// Make sure to use a callback function to avoid the deleteTodo function to run
									// when the button gets rendered (only necessary when the method/func has a parameter)
									// In this case: parameter = (todo.id)
									onChange={() => completeTodo(todo.id)}
									// If the todo already has isComplete=true -> make sure the checkbox will be checked
									checked={todo.isComplete ? true : false}
								/>
								{!todo.isEditing ? (
									<span
										className={`todo-item-label ${
											todo.isComplete
												? 'line-through'
												: ''
										}`}
										onDoubleClick={() => editTodo(todo.id)}
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
											updateTodo(event, todo.id)
										}
										onKeyDown={(event) => {
											//Commit new values when pressing Enter
											if (event.key === 'Enter') {
												updateTodo(event, todo.id);
											}
											// Cancel editing when pressing Escape
											// TODO: Escape key returns previous value (WIP)
											else if (event.key === 'Escape') {
												cancelEdit(todo.id);
											}
										}}
									/>
								)}
							</div>
							<button
								className="x-button"
								onClick={() => deleteTodo(todo.id)}
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
			</div>
		</div>
	);
}

export default App;
