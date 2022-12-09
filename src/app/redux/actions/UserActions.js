import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const getUsers = ()  => (dispatch) => {
	axios.get('api/users').then(res => {
	    dispatch({
	      type: GET_USERS,
	      payload: res.data,
	    });	
	}).catch(err => console.log)
}


export const addUser = (user) => (dispatch) => {
	console.log('Adding user:', user)
	axios.post('api/users/add', user).then(res => {
	    dispatch({
	      type: ADD_USER,
	      payload: res.data,
	    });	
	})
}


export const deleteUser = (userId) => (dispatch) => {
	console.log('UserID:', userId)
	axios.post('api/users/delete', { userId }).then(res => {
	    dispatch({
	      type: ADD_USER,
	      payload: res.data,
	    });	
	})
}


export const updateUser = (user) => (dispatch) => {
	axios.post('api/users/update', user).then(res => {
	    dispatch({
	      type: ADD_USER,
	      payload: res.data,
	    });	
	})
}