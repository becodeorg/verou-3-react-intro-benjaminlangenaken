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

	return (
		<div className="todo-app-container">
			<div className="todo-app">
				<h2>Todo App</h2>
				<form action="#">
					<input
						type="text"
						className="todo-input"
						placeholder="Add item to the list"
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
