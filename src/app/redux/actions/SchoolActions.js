import axios from 'axios';

export const GET_SCHOOLS = 'GET_SCHOOLS';
export const ADD_SCHOOL = 'ADD_SCHOOL';
export const DELETE_SCHOOL = 'DELETE_SCHOOL';
export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

export const getSchools = ()  => (dispatch) => {
	axios.get('api/schools').then(res => {
	    dispatch({
	      type: GET_SCHOOLS,
	      payload: res.data,
	    });	
	}).catch(err => console.log)
}


export const addSchool = (school) => (dispatch) => {
	axios.post('api/school/add', school).then(res => {
	    dispatch({
	      type: ADD_SCHOOL,
	      payload: res.data,
	    });	
	})
}
