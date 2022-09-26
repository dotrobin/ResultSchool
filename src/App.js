import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from './api';

function App() {
	const initialState = api.users.fetchAll();
	const [users, setUsers] = useState(initialState);

	const handleDeleteUser = (id) => {
		setUsers(users.filter(user => user._id !== id));
	};

	const handleUserBookmarkStatus = (id) => {
		setUsers(prevState => 
			prevState.map(elem => {
				if(elem._id === id) {
					elem.bookmark = !elem.bookmark;
				}
				return elem;
			}))
	};
	
	return (
		<>
			<SearchStatus count={users.length} />
			{users.length ? 
				<Users 
					users={users}
					handleDeleteUser={handleDeleteUser} 
					handleUserBookmarkStatus={handleUserBookmarkStatus}
				/>: ""
			}
		</> 
	)
};

export default App;