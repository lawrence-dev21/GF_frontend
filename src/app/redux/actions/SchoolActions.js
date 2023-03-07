import axiosInstance from "axios";

export const GET_SCHOOLS = 'GET_SCHOOLS';
export const ADD_SCHOOL = 'ADD_SCHOOL';
export const DELETE_SCHOOL = 'DELETE_SCHOOL';
export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

export const getSchools = ()  => (dispatch) => {
	const accessToken = window.localStorage.getItem('accessToken')
	fetch('http://localhost:1337/api/schools', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then(res => res.json())
	  .then(({data}) => {
	    dispatch({
	      type: GET_SCHOOLS,
	      payload: data,
	    });	
	}).catch(err => console.log)
}


export const addSchool = (school) => (dispatch) => {
	const payload = { data: school }
	axiosInstance.post('http://localhost:1337/api/schools', payload)
		.then(res => {
			// console.log(res.data)
	    dispatch({
	      type: ADD_SCHOOL,
	      payload: res.data,
	    });	
	})
}
