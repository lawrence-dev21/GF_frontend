import {
	GET_MODULES,
	ADD_MODULE,
} from '../actions/ModuleActions';


const initialState = {
  moduleList: [],
};



const ModuleReducer = function (state = initialState, action) {
	switch(action.type) {
		case GET_MODULES: {
		return {
			...state,
				moduleList: [...action.payload]
			}
		}
		case ADD_MODULE: {
			return {
				...state,
				// moduleList: [...state.moduleList, action.payload]
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