import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";
import Bookmark from "./bookmark";

const User = ({
	_id,
	name,
	qualities,
	profession,
	completedMeetings,
	rate,
	bookmark,
	handleUserBookmarkStatus,
	handleDeleteUser
}) => {
	return (
		<tr>
			<td>{name}</td>
			<td>
				{qualities.map((quality, key) => {
					return (
						<Quality
							color={quality.color}
							name={quality.name}
							key={"ql" + key}
						/>
					);
				})}
			</td>
			<td>{profession.name}</td>
			<td>{completedMeetings}</td>
			<td>{rate} / 5</td>
			<td>
				<Bookmark
					status={bookmark}
					id={_id}
					handleUserBookmarkStatus={handleUserBookmarkStatus}
				/>
			</td>
			<td>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => handleDeleteUser(_id)}
				>
					delete
				</button>
			</td>
		</tr>
	);
};

User.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	qualities: PropTypes.arrayOf(PropTypes.object),
	profession: PropTypes.object.isRequired,
	completedMeetings: PropTypes.number.isRequired,
	rate: PropTypes.number.isRequired,
	bookmark: PropTypes.bool.isRequired,
	handleUserBookmarkStatus: PropTypes.func.isRequired,
	handleDeleteUser: PropTypes.func.isRequired
};
export default User;
