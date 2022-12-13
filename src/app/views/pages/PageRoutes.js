import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

// User Management
const User = Loadable(lazy(() => import('./Users')));
const AddUserForm = Loadable(lazy(() => import('./AddUserForm')));

// School Management
const School = Loadable(lazy(() => import('./Schools')));
const AddSchoolForm = Loadable(lazy(() => import('./AddSchoolForm')));

// TODO Create the school managment pages

// Beneficiary Management
const Beneficiaries = Loadable(lazy(() => import('./Beneficiaries')));

// CSE Managment
const CSE = Loadable(lazy(() => import('./CSE')));


// Data Entry
const WeeklyBoard = Loadable(lazy(() => import('./dataEntry/Board/Boarding')));
const Disclaimerform= Loadable(lazy(() => import('./dataEntry/Disclim/Dis')));
const Parentform= Loadable(lazy(() => import('./dataEntry/ParentCon/Parent')));
const Transferform= Loadable(lazy(() => import('./dataEntry/Transfer/Transfer')));


const pageRoutes = [
  {
    path: '/users',
    element: <User/>
  },
  {
    path: '/users/add',
    element: <AddUserForm/>
  },
  {
    path: '/schools',
    element: <School/>
  },
  {
    path: '/schools/add',
    element: <AddSchoolForm/>
  },
  {
    path: '/boarding',
    element: <WeeklyBoard/>
  },
  {
    path: '/transfer/add',
    element: <Transferform/>
  },
  {
    path: '/parent',
    element: <Parentform/>
  },
  {
    path: '/Disclim/Dis',
    element: <Disclaimerform/>
  },
  {
    path: '/cse',
    element: <CSE/>
  },
  {
    path: '/beneficiaries',
    element: <Beneficiaries/>
  },
];

export default pageRoutes;
