import { useState } from 'react';
import '../App.css';

function App() {
	const [todos, setTodos] = useState([
		{
			id: 1,
			title: 'Example item 1',
			isComplete: false,
		},
		{
			id: 2,
			title: 'Example item 2',
			isComplete: true,
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
			},
		]);

		// Revert back to an empty string after submitting the form
		setTodoInput('');
		// Increment our id after each addition
		setTodoId((prevTodoId) => prevTodoId + 1);
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
						<li className="todo-item-container">
							<div className="todo-item">
								<input type="checkbox" className="checkbox" />
								<span className="todo-item-label">
									{todo.title}
								</span>
							</div>
							<button className="x-button">
								<svg
									className="x-button-icon"
									fill="none"
									viewbox="0 0 24 24"
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
