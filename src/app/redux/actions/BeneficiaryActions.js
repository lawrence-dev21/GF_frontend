import axiosInstance from "axios";;

export const GET_BENEFICIARIES = 'GET_BENEFICIARIES';
export const ADD_BENEFICIARY = 'ADD_BENEFICIARY';

export const getBeneficiaries = ()  => (dispatch) => {
	console.log('Dispacthing action, beneficiaries')
	axiosInstance.get('api/beneficiaries').then(res => {
	    dispatch({
	      type: GET_BENEFICIARIES,
	      payload: res.data,
	    });	
	}).catch(err => console.log(err))
}


export const addBeneficiary = (beneficiary) => (dispatch) => {
	axiosInstance.post('api/beneficiaries/add', beneficiary).then(res => {
	    dispatch({
	      type: ADD_BENEFICIARY,
	      payload: res.data,
	    });	
	})
}

