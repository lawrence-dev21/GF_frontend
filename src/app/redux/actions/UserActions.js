import axiosInstance from 'axios';

export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const getUsers = ()  => (dispatch) => {
	axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/users`).then(res => {
	    dispatch({
	      type: GET_USERS,
	      payload: res.data,
	    });	
	}).catch(err => console.log)
}


export const addUser = (user) => (dispatch) => {
	const payload = {
		...user,
		confirmed: false,
		role: {
			connect: [{
				id: user.role
			}]
		},
		school: {
			connect: [{
				id: user.school
			}]
		}
	}
	console.log('Adding user to strapi', payload)
	axiosInstance.post(`${process.env.REACT_APP_BACKEND}api/users`, user).then(res => {
	    dispatch({
	      type: ADD_USER,
	      payload: res.data,
	    });	
	})
}


export const deleteUser = (userId) => (dispatch) => {
	console.log('UserID:', userId)
	axiosInstance.post('api/users/delete', { userId }).then(res => {
	    dispatch({
	      type: ADD_USER,
	      payload: res.data,
	    });	
	})
}


export const updateUser = (user) => (dispatch) => {
	axiosInstance.post('api/users/update', user).then(res => {
	    dispatch({
	      type: ADD_USER,
	      payload: res.data,
	    });	
	})
}