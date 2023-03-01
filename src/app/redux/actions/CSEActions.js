import axios from 'axios';

export const GET_CSE = 'GET_CSE';
export const ADD_CSE_ATTENDENCE = 'ADD_CSE_ATTENDENCE';
export const ENROLL_CSE = 'ENROLL_CSE';

export const getCSE = ()  => (dispatch) => {
	console.log('Dispacthing action, cse')
	axios.get('api/cse').then(res => {
	    dispatch({
	      type: GET_CSE,
	      payload: res.data,
	    });	
	}).catch(err => console.log(err))
}


export const addCSEAttendence = (cseAttendence) => (dispatch) => {
	axios.post('api/cse/add', cseAttendence).then(res => {
	    dispatch({
	      type: ADD_CSE_ATTENDENCE,
	      payload: res.data,
	    });	
	})
}
export const enrollCSE = (students) => (dispatch) => {
	axios.post('api/cse/enroll', students).then(res => {
	    dispatch({
	      type: ENROLL_CSE,
	      payload: res.data,
	    });	
	})
}

