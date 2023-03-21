import axiosInstance from "axios";;

export const GET_CSE = 'GET_CSE';
export const ADD_CSE_ATTENDENCE = 'ADD_CSE_ATTENDENCE';
export const ENROLL_CSE = 'ENROLL_CSE';

export const getCSE = ()  => (dispatch) => {
	console.log('Dispacthing action, cse')
	axiosInstance.get('api/cse').then(res => {
	    dispatch({
	      type: GET_CSE,
	      payload: res.data,
	    });	
	}).catch(err => console.log(err))
}


export const addCSEAttendence = (cseAttendence) => (dispatch) => {
	const payload = { data: cseAttendence}
	console.log(payload)
	axiosInstance.post(`${process.env.REACT_APP_BACKEND}api/attendences`, payload).then(res => {
	    dispatch({
	      type: ADD_CSE_ATTENDENCE,
	      payload: res.data,
	    });	
	})
}
export const enrollCSE = (attributes) => (dispatch) => {
	const { id } = attributes;
	const payload = { data: {students: attributes.students}}
	axiosInstance.put(`${process.env.REACT_APP_BACKEND}api/cses/${id}`, payload).then(res => {
	    dispatch({
	      type: ENROLL_CSE,
	      payload: res.data,
	    });	
	})
}

