import React, {useContext, useMemo} from 'react';
// import PropTypes from 'prop-types';
import {TodosContext} from '../context/TodosContext';

// const CheckAllTodos = (props) => {
const CheckAllTodos = () => {
	const {todos, setTodos} = useContext(TodosContext);

	const remainingCalculation = () => {
		// console.log('calculating...');
		// for (let index = 0; index < 2000000000; index++) {}
		return todos.filter((todo) => !todo.isComplete).length;
	};

	const remainingTodos = useMemo(remainingCalculation, [todos]);

	const completeAllTodos = () => {
		const updatedTodos = todos.map((todo) => {
			todo.isComplete = !todo.isComplete;
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<div className="check-all-container">
			<div>
				<div onClick={completeAllTodos} className="button">
					Check all
				</div>
			</div>
			<span>{remainingTodos} items remaining</span>
		</div>
	);
};

// CheckAllTodos.propTypes = {
// 	remainingTodos: PropTypes.number.isRequired,
// 	completeAllTodos: PropTypes.func.isRequired,
// };

export default CheckAllTodos;
