import axiosInstance from "axios";;

export const GET_MODULES = 'GET_MODULES';
export const ADD_MODULE = 'ADD_MODULE';
export const DELETE_MODULE = 'DELETE_MODULE';
export const UPDATE_MODULE = 'UPDATE_SCHOOL';

export const getModules = ()  => (dispatch) => {
	axiosInstance.get('http://localhost:1337/api/modules?fields[0]=title&fields[1]=description&populate[0]=grades').then(res => {
	    dispatch({
	      type: GET_MODULES,
	      payload: res.data.data,
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
		dispatch(getModules());
	})
}
export const deleteModule = (moduleId) => (dispatch) => {
	axiosInstance.delete(`http://localhost:1337/api/modules/${moduleId}`)
	  .then(() => {
		dispatch({
		  type: DELETE_MODULE,
		  payload: moduleId
		});	
		dispatch(getModules());
	  })
	  .catch(err => console.log(err));
  }
  
  export const updateModule = (moduleId, updatedModule) => (dispatch) => {
	const payload = {
	  data: updatedModule
	}
	axiosInstance.put(`http://localhost:1337/api/modules/${moduleId}`, payload)
	  .then(({ data }) => {
		dispatch({
		  type: UPDATE_MODULE,
		  payload: data
		});	
	  })
	  .catch(err => console.log(err));
  }

