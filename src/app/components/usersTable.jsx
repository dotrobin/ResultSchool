import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
	users,
	onSort,
	selectedSort,
	onToggleBookmark,
	onDelete,
	...rest
}) => {
	const columns = {
		name: {
			path: "name",
			name: "Имя",
			component: (user) => (
				<a><Link to={"/users/" + user._id}>{user.name}</Link></a>
			)
		},
		qualities: {
			path: "qualities",
			name: "Качества",
			component: (user) => (
				<QualitiesList
					qualities={user.qualities}
				/>)
		},
		professions: { path: "profession.name", name: "Профессия" },
		complitedMeetings: { path: "completedMeetings", name: "Встретился раз" },
		rate: { path: "rate", name: "Оценка" },
		bookmark: {
			path: "bookmark",
			name: "Избранное",
			component: (user) => (
				<Bookmark
					status={ user.bookmark }
					onClick={ () => onToggleBookmark(user._id) }
				/>)
		},
		delete: {
			path: "delete",
			component: (user) => (
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => onDelete(user._id)}
				>
					delete
				</button>
			)
		}
	};
	return (
		<Table
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}
		/>
	);
};

UserTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func.isRequired,
	selectedSort: PropTypes.object.isRequired,
	onToggleBookmark: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default UserTable;
