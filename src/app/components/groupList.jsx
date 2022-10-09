import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, selectedItem, onItemSelect }) => {
	console.log(items);
	return (
		<ul className="list-group">
			{Object.keys(items).map(item => (
				<li
					role="button"
					key={items[item][valueProperty]}
					className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
					onClick={() => onItemSelect(items[item])}
				>
					{items[item][contentProperty]}
				</li>
			))}
		</ul>
	);
};

GroupList.defaultProps = {
	valueProperty: "_id",
	contentProperty: "name"
};

GroupList.propTypes = {
	items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	onItemSelect: PropTypes.func.isRequired,
	valueProperty: PropTypes.string,
	contentProperty: PropTypes.string,
	selectedItem: PropTypes.object
};

export default GroupList;
