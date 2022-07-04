import React, {useContext} from 'react';
// import PropTypes from 'prop-types';
import {TodosContext} from '../context/TodosContext';

// const TodoFilters = (props) => {
const TodoFilters = () => {
	const {filter, setFilter} = useContext(TodosContext);

	return (
		<div>
			<button
				onClick={() => {
					setFilter('all');
				}}
				// Add additional class 'filter-button-active' when filter = 'all'
				className={`button filter-button ${
					filter === 'all' ? 'filter-button-active' : ''
				}`}
			>
				All
			</button>
			<button
				onClick={() => {
					setFilter('active');
				}}
				className={`button filter-button ${
					filter === 'active' ? 'filter-button-active' : ''
				}`}
			>
				Active
			</button>
			<button
				onClick={() => {
					setFilter('completed');
				}}
				className={`button filter-button ${
					filter === 'completed' ? 'filter-button-active' : ''
				}`}
			>
				Completed
			</button>
		</div>
	);
};

// Make sure the correct prop type will be used thanks to propTypes package
// TodoFilters.propTypes = {
// 	filter: PropTypes.string.isRequired,
// 	setFilter: PropTypes.func.isRequired,
// };

export default TodoFilters;
