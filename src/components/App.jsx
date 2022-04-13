import { useState } from 'react';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

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

	const [todoId, setTodoId] = useState(3);

	const addTodo = (titleString) => {
		setTodos([
			...todos,
			{
				id: todoId,
				title: titleString,
				isComplete: false,
				isEditing: false,
			},
		]);

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
				{/*Add function as a prop so TodoForm has access to it*/}
				<TodoForm addTodo={addTodo} />
				{todos.length > 0 ? (
					// Add parent element <> (empty tags) for when we will add more elements inside the condition
					// Otherwise React will trow an error
					<>
						<TodoList
							todos={todos}
							completeTodo={completeTodo}
							editTodo={editTodo}
							updateTodo={updateTodo}
							cancelEdit={cancelEdit}
							deleteTodo={deleteTodo}
						/>
					</>
				) : (
					<NoTodos />
				)}
			</div>
		</div>
	);
}

export default App;
