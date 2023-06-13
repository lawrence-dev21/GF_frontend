import {
	GET_MODULES,
	ADD_MODULE,
	DELETE_MODULE,
	UPDATE_MODULE,
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
		case DELETE_MODULE: 
		return {
			...state,
			moduleList: state.moduleList.filter(module => module.id !== action.payload)
		};
		case UPDATE_MODULE:
			return {
			  ...state,
			  moduleList: state.moduleList.map(module => {
				if (module.id === action.payload.id) {
				  return action.payload;
				}
				return module;
			  })
			};
		default: {
			return {
				...state
			}
		}
	}
}

export default ModuleReducer