import '../App.css';

function App() {
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
					<li className="todo-item-container">
						<div className="todo-item">
							<input type="checkbox" className="checkbox" />
							<span className="todo-item-label">
								Example item 1
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
					<li className="todo-item-container">
						<div className="todo-item">
							<input type="checkbox" className="checkbox" />
							<span className="todo-item-label line-through">
								Example item 2
							</span>
							{/* <input type="text" className="todo-item-input" value="Go to Grocery" /> */}
						</div>
						<button className="x-button">
							<svg
								className="x-button-icon"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
