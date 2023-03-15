import axiosInstance from "axios";;

export const GET_BENEFICIARIES = 'GET_BENEFICIARIES';
export const ADD_BENEFICIARY = 'ADD_BENEFICIARY';

export const getBeneficiaries = ()  => (dispatch) => {
	console.log('Dispacthing action, beneficiaries')
	axiosInstance.get('http://localhost:1337/api/students?populate[0]=parent.users_permissions_user&populate[1]=user&populate[2]=school&populate[3]=grade&populate[4]=user').then(({data: {data}}) => {
	    dispatch({
	      type: GET_BENEFICIARIES,
	      payload: data,
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

