import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

// User Management
const User = Loadable(lazy(() => import('./Users')));
const AddUserForm = Loadable(lazy(() => import('./AddUserForm')));

// School Management
const School = Loadable(lazy(() => import('./Schools')));
const AddSchoolForm = Loadable(lazy(() => import('./AddSchoolForm')));


// Module Management
const Module = Loadable(lazy(() => import('./Modules')));
const AddModuleForm = Loadable(lazy(() => import('./AddModuleForm')));

// TODO Create the school managment pages

// Beneficiary Management
const Beneficiaries = Loadable(lazy(() => import('./Beneficiaries')));
const AddBeneficiaryForm = Loadable(lazy(() => import('./AddBeneficiaryForm')));

// CSE Managment
const CSE = Loadable(lazy(() => import('./CSE')));
const CSEId = Loadable(lazy(() => import('./CSEId')));
const AddCSEForm = Loadable(lazy(() => import('./AddCSEForm')));
const AddCSEAttendenceForm = Loadable(lazy(() => import('./AddCSEForm')));
const EnrollCSEForm = Loadable(lazy(() => import('./EnrollCSEForm')));


// Data Entry
const WeeklyBoard = Loadable(lazy(() => import('./dataEntry/Board/Boarding')));
const Disclaimerform= Loadable(lazy(() => import('./dataEntry/Disclim/Dis')));
const Parentform= Loadable(lazy(() => import('./dataEntry/ParentCon/Parent')));
const Transferform= Loadable(lazy(() => import('./dataEntry/Transfer/Transfer')));


const pageRoutes = [
  {
    path: '/users',
    element: <User/>,
    auth: authRoles.admin
  },
  {
    path: '/add-users',
    element: <AddUserForm/>,
    auth: authRoles.admin,
  },
  {
    path: '/schools',
    element: <School/>,
    auth: authRoles.admin,
  },
  {
    path: '/add-schools',
    element: <AddSchoolForm/>,
    auth: authRoles.sa,
  },{
    path: '/modules',
    element: <Module/>,
    auth: authRoles.guest,
  },
  {
    path: '/add-modules',
    element: <AddModuleForm/>,
    auth: authRoles.editor,
  },
  {
    path: '/boarding',
    element: <WeeklyBoard/>,
    // auth: authRoles.sa
  },
  {
    path: '/transfer/add',
    element: <Transferform/>,
    // auth: authRoles.sa
  },
  {
    path: '/parent',
    element: <Parentform/>,
    // auth: authRoles.sa
  },
  {
    path: '/Disclim/Dis',
    element: <Disclaimerform/>,
    // auth: authRoles.sa
  },
  {
    path: '/cse',
    element: <CSE/>,
    // auth: authRoles.sa
  },
  {
    path: '/cse/:id',
    element: <CSEId/>,
    // auth: authRoles.sa
  },
  {
    path: '/add-cse',
    element: <AddCSEForm/>,
    // auth: authRoles.sa
  },
  {
    path: '/cse-attendence/:id',
    element: <AddCSEAttendenceForm/>,
    // auth: authRoles.sa
  },
  {
    path: '/enroll-cse/:id',
    element: <EnrollCSEForm/>,
    // auth: authRoles.sa
  },
  {
    path: '/beneficiaries',
    element: <Beneficiaries/>,
    // auth: authRoles.sa
  },
  {
    path: '/add-beneficiaries',
    element: <AddBeneficiaryForm/>
  }
];

export default pageRoutes;
