import {
	GET_USERS,
	ADD_USER,
	DELETE_USER,
	UPDATE_USER
} from '../actions/UserActions';


const initialState = {
  usersList: [],
};



const UserReducer = function (state = initialState, action) {
	switch(action.type) {
		case GET_USERS: {
		return {
				usersList: [...action.payload]
			}
		}
		case ADD_USER: {
			return {
				usersList: [...action.payload]
			}
		}
		case DELETE_USER: {
			return {
				usersList: [...action.payload]
			}
		}
		case UPDATE_USER: {
			return {
				usersList: [...action.payload]
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