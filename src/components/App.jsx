import { useEffect, useMemo, useRef, useState } from 'react';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
	const [name, setName] = useState('');

	// Add useRef hook to reference the name input field/DOM element
	const nameInputElement = useRef(null);

	const addName = (event) => {
		// Prevent adding of empty strings and whitespaces
		if (event.target.value.trim().length === 0) {
			return name;
		}
		return setName(event.target.value);
	};

	const handleEscape = () => {
		return name;
	};

	const [todos, setTodos] = useState([
		// {
		// 	id: 1,
		// 	title: 'Example item 1',
		// 	isComplete: false,
		// 	isEditing: false,
		// },
		// {
		// 	id: 2,
		// 	title: 'Example item 2',
		// 	isComplete: true,
		// 	isEditing: false,
		// },
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

	// Add useMemo hook to improve performance by caching the result of remainingTodos
	// and only using it when the todos change (DependencyList = [todos])
	const remainingCalculation = () => {
		// console.log('calculating...');
		// for (let index = 0; index < 2000000000; index++) {}
		return todos.filter((todo) => !todo.isComplete).length;
	};

	const remainingTodos = useMemo(remainingCalculation, [todos]);

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

	// Add useEffect hook to immediately focus the name input field
	// when the component mounts by adding [] to the DependencyList
	useEffect(() => {
		nameInputElement.current.focus();
	}, []);

	return (
		<div className="todo-app-container">
			<div className="todo-app">
				{!name ? (
					<div className="name-container">
						<h2>What is your name?</h2>
						<form action="#">
							<input
								type="text"
								className="todo-input"
								placeholder="Please enter your name..."
								defaultValue={name}
								autoFocus
								ref={nameInputElement}
								// Commit new values when clicking outside of input field
								onBlur={(event) => addName(event)}
								onKeyDown={(event) => {
									//Commit new values when pressing Enter
									if (event.key === 'Enter') {
										addName(event);
									}
									// Cancel editing when pressing Escape
									// TODO: Escape key returns previous value (WIP)
									else if (event.key === 'Escape') {
										handleEscape();
									}
								}}
							/>
						</form>
					</div>
				) : (
					<h2>{name}'s Todo App</h2>
				)}

				{!name ? (
					''
				) : (
					/*Add addTodo function as a prop so TodoForm has access to it*/
					<TodoForm addTodo={addTodo} />
				)}

				{name && todos.length > 0 ? (
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
					''
				)}

				{name && todos.length === 0 ? <NoTodos /> : ''}
			</div>
		</div>
	);
}

export default App;
