import axiosInstance from "axios";;

export const GET_MODULES = 'GET_MODULES';
export const ADD_MODULE = 'ADD_MODULE';
export const DELETE_MODULE = 'DELETE_MODULE';
export const UPDATE_MODULE = 'UPDATE_SCHOOL';

export const getModules = ()  => (dispatch) => {
	axiosInstance.get('api/modules').then(res => {
	    dispatch({
	      type: GET_MODULES,
	      payload: res.data,
	    });	
	}).catch(err => console.log)
}


export const addModule = (module) => (dispatch) => {
	const payload = {
		data: module
	}
	axiosInstance.post('http://localhost:1337/api/modules', payload).then(({data}) => {
	    dispatch({
	      type: ADD_MODULE,
	      payload: data
	    });	
	})
}

