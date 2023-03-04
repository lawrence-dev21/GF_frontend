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
	axiosInstance.post('api/modules/add', module).then(res => {
	    dispatch({
	      type: ADD_MODULE,
	      payload: res.data,
	    });	
	})
}

