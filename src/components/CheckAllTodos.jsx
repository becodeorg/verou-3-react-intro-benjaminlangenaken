import React from 'react';
import PropTypes from 'prop-types';

const CheckAllTodos = (props) => {
	return (
		<div className="check-all-container">
			<div>
				<div onClick={props.completeAllTodos} className="button">
					Check all
				</div>
			</div>
			<span>{props.remainingTodos} items remaining</span>
		</div>
	);
};

CheckAllTodos.propTypes = {
	remainingTodos: PropTypes.number.isRequired,
	completeAllTodos: PropTypes.func.isRequired,
};

export default CheckAllTodos;
