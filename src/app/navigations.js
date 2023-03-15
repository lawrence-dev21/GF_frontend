import { authRoles } from './auth/authRoles'
export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard'},
  { label: 'Management', type: 'label' },
  {
    name: 'User Management',
    icon: 'manage_accounts',
    children: [
      { name: 'Users', iconText: 'SI', path: '/users' },
      { name: 'Add User', iconText: 'SU', path: '/add-users' },
    ],
    auth: authRoles.admin
  },{
    name: 'School Management',
    icon: 'account_balance',
    children: [
      { name: 'Schools', iconText: 'SI', path: '/schools',auth: authRoles.editor },
      { name: 'Add School', iconText: 'SU', path: '/add-schools',auth: authRoles.sa },
    ]
  },
  {
    name: 'CSE',
    icon: 'menu_book',
    children: [
      { name: 'CSE', iconText: 'MO', path: '/cse' },
      { name: 'CSE Attendance', iconText: 'CS', path: '/add-cse' },
      { name: 'CSE Enrollment', iconText: 'CE', path: '/enroll-cse' },
      { name: 'Learning Materials', iconText: 'LM', path: '/modules'}
    ],
  },
  {
    name: 'Beneficiary Management',
    icon: 'wc',
    children: [
      { name: 'Beneficiaries', iconText: 'YS', path: '/beneficiaries' },
      { name: 'Add Beneficiaries', iconText: 'YS', path: '/add-beneficiaries', auth: authRoles.editor },


    ],auth: authRoles.admin
  },
  // {
  //   name: 'CSE',
  //   icon: 'menu_book',
  //   children: [
  //     { name: 'Materials', iconText: 'SI', path: '/cse' },
  //     // { name: 'Clubs', iconText: 'SU', path: '/session/signup' },
  //   ],
  // },
  
  // { label: 'Others', type: 'label' },
  // {
  //   name: 'Data Entry',
  //   icon: 'assignment',
  //   children: [
  //     { name: 'Beneficiary Form', iconText: 'SI', path: '/session/signup' },
  //     { name: 'Disclaimer Form', iconText: 'SI', path: '/Disclim/Dis' },
  //     { name: 'Parental Consent form', iconText: 'SU', path: '/ParentCon/Parent' },
  //     { name: 'Transfer Form', iconText: 'SI', path: '/Transfer/Transfer' },
  //     { name: 'Weekly Board Facility', iconText: 'SU', path: '/Board/Boarding' },
  //   ],
  // },
  // {
  //   name: 'Report',
  //   icon: 'assessment',
  //   children: [
  //     { name: 'All reports', iconText: 'SI', path: '/session/signup' },
  //   ],
  // },
];
