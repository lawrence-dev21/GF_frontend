import {
	GET_USERS,
	ADD_USER,
	DELETE_USER,
	UPDATE_USER
} from '../actions/UserActions';


const initialState = {
  userList: [],
};



const UserReducer = function (state = initialState, action) {
	switch(action.type) {
		case GET_USERS: {
		return {
			...state,
				userList: [...action.payload]
			}
		}
		case ADD_USER: {
			return {
				...state,
				userList: [...action.payload]
			}
		}
		case DELETE_USER: {
			return {
				...state,
				userList: [...action.payload]
			}
		}
		case UPDATE_USER: {
			return {
				...state,
				userList: [...action.payload]
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export default UserReducer