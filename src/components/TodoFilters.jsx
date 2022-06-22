import React from 'react';
import PropTypes from 'prop-types';

const TodoFilters = (props) => {
	return (
		<div>
			<button
				onClick={() => {
					props.setFilter('all');
				}}
				// Add additional class 'filter-button-active' when filter = 'all'
				className={`button filter-button ${
					props.filter === 'all' ? 'filter-button-active' : ''
				}`}
			>
				All
			</button>
			<button
				onClick={() => {
					props.setFilter('active');
				}}
				className={`button filter-button ${
					props.filter === 'active' ? 'filter-button-active' : ''
				}`}
			>
				Active
			</button>
			<button
				onClick={() => {
					props.setFilter('completed');
				}}
				className={`button filter-button ${
					props.filter === 'completed' ? 'filter-button-active' : ''
				}`}
			>
				Completed
			</button>
		</div>
	);
};

// Make sure the correct prop type will be used thanks to propTypes package
TodoFilters.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
};

export default TodoFilters;
