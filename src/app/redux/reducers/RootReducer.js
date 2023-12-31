import { combineReducers } from 'redux';
import EcommerceReducer from './EcommerceReducer';
import NavigationReducer from './NavigationReducer';
import NotificationReducer from './NotificationReducer';
import UserReducer from './UserReducer';
import SchoolReducer from './SchoolReducer';
import ModuleReducer from './ModuleReducer';
import BeneficiaryReducer from './BeneficiaryReducer';
import CSEReducer from './CSEReducer';

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  navigations: NavigationReducer,
  ecommerce: EcommerceReducer,
  users: UserReducer,
  schools: SchoolReducer,
  modules: ModuleReducer,
  beneficiaries: BeneficiaryReducer,
  cse: CSEReducer,
});

export default RootReducer;
