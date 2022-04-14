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
				return todo;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const remainingTodos = () => {
		return todos.filter((todo) => !todo.isComplete).length;
	};

	const completeAllTodos = () => {
		const updatedTodos = todos.map((todo) => {
			todo.isComplete = true;
			return todo;
		});
		setTodos(updatedTodos);
	};

	const clearCompleted = () => {
		setTodos([...todos].filter((todo) => !todo.isComplete));
	};
	const [filter, setFilter] = useState('all');

	const todosFiltered = (filter) => {
		if (filter === 'all') {
			return todos;
		} else if (filter === 'active') {
			return todos.filter((todo) => !todo.isComplete);
		} else if (filter === 'completed') {
			return todos.filter((todo) => todo.isComplete);
		}
	};

	return (
		<div className="todo-app-container">
			<div className="todo-app">
				<h2>Todo App</h2>
				{/*Add function as a prop so TodoForm has access to it*/}
				<TodoForm addTodo={addTodo} />
				{todos.length > 0 ? (
					<TodoList
						todos={todos}
						completeTodo={completeTodo}
						editTodo={editTodo}
						updateTodo={updateTodo}
						cancelEdit={cancelEdit}
						deleteTodo={deleteTodo}
						remainingTodos={remainingTodos}
						clearCompleted={clearCompleted}
						completeAllTodos={completeAllTodos}
						todosFiltered={todosFiltered}
						filter={filter}
						setFilter={setFilter}
					/>
				) : (
					<NoTodos />
				)}
			</div>
		</div>
	);
}

export default App;
