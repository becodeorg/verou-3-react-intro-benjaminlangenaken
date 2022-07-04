import {useEffect, useRef, useState} from 'react';
import '../App.css';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import {TodosContext} from '../context/TodosContext';

function App() {
	// Use custom hook for username in localStorage
	const [name, setName] = useLocalStorage('name', '');

	const addName = (event) => {
		// Prevent adding of empty strings and whitespaces
		if (event.target.value.trim().length === 0) {
			return name;
		}
		// localStorage.setItem('name', JSON.stringify(event.target.value));
		return setName(event.target.value);
	};

	const [todos, setTodos] = useLocalStorage('todos', []);
	// const [todos, setTodos] = useState([
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
	// ]);

	const [todoId, setTodoId] = useLocalStorage('id', 1);
	// const [todoId, setTodoId] = useState(3);

	// We can use this logic inside TodoForm thanks to useContext
	// const addTodo = (titleString) => {
	// 	setTodos([
	// 		// Use spread operator (...todos) inside the array to add on new value after the already existing ones
	// 		// Similar to array.push
	// 		...todos,
	// 		{
	// 			id: todoId,
	// 			title: titleString,
	// 			isComplete: false,
	// 			// Add isEditing property to make input field visible instead of <span> element
	// 			isEditing: false,
	// 		},
	// 	]);
	//
	// 	// Increment our id after each addition
	// 	setTodoId((prevTodoId) => prevTodoId + 1);
	// };

	// Moved deleteTodo, completeTodo, editTodo, updateTodo, cancelEdit to TodoList component using useContext
	// const deleteTodo = (id) => {
	// 	// Only keep the items where the id differs from the current id
	// 	setTodos([...todos].filter((todo) => id !== todo.id));
	// };
	//
	// const completeTodo = (id) => {
	// 	// Go through list of todos and mark the current id as complete
	// 	const updatedTodos = todos.map((todo) => {
	// 		if (todo.id === id) {
	// 			todo.isComplete = !todo.isComplete;
	// 		}
	// 		return todo;
	// 	});
	// 	setTodos(updatedTodos);
	// };
	//
	// const editTodo = (id) => {
	// 	const updatedTodos = todos.map((todo) => {
	// 		if (todo.id === id) {
	// 			todo.isEditing = true;
	// 		}
	// 		return todo;
	// 	});
	// 	setTodos(updatedTodos);
	// };
	//
	// const updateTodo = (event, id) => {
	// 	const updatedTodos = todos.map((todo) => {
	// 		if (todo.id === id) {
	// 			// Prevent adding of empty strings and whitespaces
	// 			if (event.target.value.trim().length === 0) {
	// 				todo.isEditing = false;
	// 				return todo;
	// 			}
	// 			todo.title = event.target.value;
	// 			todo.isEditing = false;
	// 		}
	// 		return todo;
	// 	});
	// 	setTodos(updatedTodos);
	// };
	//
	// const cancelEdit = (id) => {
	// 	const updatedTodos = todos.map((todo) => {
	// 		if (todo.id === id) {
	// 			todo.isEditing = false;
	// 		}
	// 		return todo;
	// 	});
	// 	setTodos(updatedTodos);
	// };

	// Moved remainingTodos, completeAllTodos to CheckAllTodos component using useContext
	// // Add useMemo hook to improve performance by caching the result of remainingTodos
	// // and only using it when the todos change (DependencyList = [todos])
	// // Refactor using useContext --> No longer necessary to pass as a prop
	// const remainingCalculation = () => {
	// 	// console.log('calculating...');
	// 	// for (let index = 0; index < 2000000000; index++) {}
	// 	return todos.filter((todo) => !todo.isComplete).length;
	// };
	//
	// const remainingTodos = useMemo(remainingCalculation, [todos]);
	//
	// const completeAllTodos = () => {
	// 	const updatedTodos = todos.map((todo) => {
	// 		todo.isComplete = !todo.isComplete;
	// 		return todo;
	// 	});
	// 	setTodos(updatedTodos);
	// };

	// Moved clearCompleted to TodoList component using useContext
	// const clearCompleted = () => {
	// 	setTodos([...todos].filter((todo) => !todo.isComplete));
	// };

	const [filter, setFilter] = useState('all');

	// Moved todosFiltered to TodoList component using useContext
	// const todosFiltered = (filter) => {
	// 	if (filter === 'all') {
	// 		return todos;
	// 	} else if (filter === 'active') {
	// 		return todos.filter((todo) => !todo.isComplete);
	// 	} else if (filter === 'completed') {
	// 		return todos.filter((todo) => todo.isComplete);
	// 	}
	// };

	// Add useRef hook to reference the name input field/DOM element
	const nameInputElement = useRef(null);

	// Add useEffect hook to immediately focus the name input field
	// when the component mounts by adding [] to the DependencyList
	useEffect(() => {
		nameInputElement.current.focus();

		// Also add the username from localStorage
		// setName(JSON.parse(localStorage.getItem('name')) ?? '');
	}, []);

	// const [featuresVisible, setFeaturesVisible] = useState(false);

	// Store username and todos in localStorage, so the data remains after page refresh
	// const handleName = (event) => {
	// addName(event);
	// localStorage.setItem('name', JSON.stringify(event.target.value));
	// };

	return (
		// Use the <TodosContext.Provider> wrapper where you want to use global state
		//Define global state by passing the Provider a value
		<TodosContext.Provider
			value={{
				todos,
				setTodos,
				todoId,
				setTodoId,
				filter,
				setFilter,
			}}
		>
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
									onKeyDown={(event) => {
										// Commit new values when pressing Enter
										if (event.key === 'Enter') {
											addName(event);
										}
									}}
								/>
							</form>
						</div>
					) : (
						<h2>{name}'s Todo App</h2>
					)}

					{name && (
						// Add addTodo function as a prop so TodoForm has access to it (OLD)
						<TodoForm
						// No longer necessary to pass addTodo as a prop thanks to useContext
						// addTodo={addTodo}
						/>
					)}

					{name && todos.length > 0 && (
						<TodoList
						// todos={todos}
						// completeTodo={completeTodo}
						// editTodo={editTodo}
						// updateTodo={updateTodo}
						// cancelEdit={cancelEdit}
						// deleteTodo={deleteTodo}
						// remainingTodos={remainingTodos}
						// completeAllTodos={completeAllTodos}
						// clearCompleted={clearCompleted}
						// todosFiltered={todosFiltered}
						// filter={filter}
						// setFilter={setFilter}
						// featuresVisible={featuresVisible}
						// setFeaturesVisible={setFeaturesVisible}
						/>
					)}

					{name && todos.length === 0 && <NoTodos />}
				</div>
			</div>
		</TodosContext.Provider>
	);
}

export default App;
