import {
	GET_CSE,
	ENROLL_CSE,
	ADD_CSE_ATTENDENCE,
	
} from '../actions/CSEActions';


const initialState = {
  cseAttendenceList: [],
  cseStudentList: [],
};



const ModuleReducer = function (state = initialState, action) {
	switch(action.type) {
		case GET_CSE: {
		return {
			...state,
				cseStudentList: [...action.payload]
			}
		}
		case ADD_CSE_ATTENDENCE: {
			return {
				...state,
				cseAttendenceList: [...state.cseAttendanceList, action.payload]
			}
		}
		case ENROLL_CSE: {
			return {
				...state,
				cseAttendenceList: [...state.cseAttenceList, action.payload]
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export default ModuleReducer