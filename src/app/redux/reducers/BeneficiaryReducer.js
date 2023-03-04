import {
	GET_BENEFICIARIES,
	ADD_BENEFICIARY,
} from '../actions/BeneficiaryActions';


const initialState = {
  beneficiaryList: [],
};

const ModuleReducer = function (state = initialState, action) {
	switch(action.type) {
		case GET_BENEFICIARIES: {
		return {
			...state,
				beneficiaryList: [...action.payload]
			}
		}
		case ADD_BENEFICIARY: {
			return {
				...state,
				beneficiaryList: [...action.payload]
			}
		}
		default: {
			return {
				...state
			}
		}
	}
}

export default ModuleReducer