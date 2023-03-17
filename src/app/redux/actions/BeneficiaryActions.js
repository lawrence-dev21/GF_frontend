import axiosInstance from "axios";;

export const GET_BENEFICIARIES = 'GET_BENEFICIARIES';
export const ADD_BENEFICIARY = 'ADD_BENEFICIARY';

export const getBeneficiaries = ()  => (dispatch) => {
	console.log('Dispacthing action, beneficiaries')
	axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/students?populate[0]=parent.users_permissions_user&populate[1]=user&populate[2]=school&populate[3]=grade`).then(({data: {data}}) => {
	    dispatch({
	      type: GET_BENEFICIARIES,
	      payload: data,
	    });	
	}).catch(err => console.log(err))
}


export const addBeneficiary = (beneficiary) => (dispatch) => {
	const payload = {
		data: beneficiary
	}
	axiosInstance.post(`${process.env.REACT_APP_BACKEND}api/v1-post-student`, payload)
			.then(({data}) => {
				dispatch({
					type: ADD_BENEFICIARY,
					payload: data,
				});	
	})
}

