import {
	GET_SCHOOLS,
	ADD_SCHOOL,
	DELETE_SCHOOL,
	UPDATE_SCHOOL
} from '../actions/SchoolActions';


const initialState = {
  schoolList: [],
};



const SchoolReducer = function (state = initialState, action) {
	switch(action.type) {
		case GET_SCHOOLS: {
		return {
			...state,
				schoolList: [...action.payload]
			}
		}
		case ADD_SCHOOL: {
			return {
				...state,
				schoolList: [...action.payload]
			}
		}
		case DELETE_SCHOOL: {
			return {
				...state,
				schoolList: [...action.payload]
			}
		}
		case UPDATE_SCHOOL: {
			return {
				...state,
				schoolList: [...action.payload]
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export default SchoolReducer