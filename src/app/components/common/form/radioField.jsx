import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
	return (
		<div className="mb-4">
			<label className="form-label">
				{label}
			</label>
			{options && options.map((option) => (
				<div
					key={option.name + "_" + option.value}
					className="form-check form-check-inline"
				>
					<input
						className="form-check-input"
						type="radio"
						name={name}
						id={option.name + "_" + option.value}
						value={value}
						onChange={onChange}
						checked={option.value === value}
					/>
					<label
						className="form-check-label"
						htmlFor={option.name + "_" + option.value}>
						{option.name}
					</label>
				</div>
			))}
		</div>
	);
};

RadioField.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array,
	name: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string
};

export default RadioField;
