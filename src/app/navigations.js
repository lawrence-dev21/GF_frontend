export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'Management', type: 'label' },
  {
    name: 'User Management',
    icon: 'manage_accounts',
    children: [
      { name: 'Users', iconText: 'SI', path: '/usermanagement/user' },
      { name: 'Active users', iconText: 'SU', path: '/session/signup' },
    ],
  },
  {
    name: 'Beneficiary Management',
    icon: 'wc',
    children: [
      { name: 'Beneficiaries', iconText: 'SI', path: '/beneficiarymanagement/beneficiaries' },
      { name: 'Annual Promotion', iconText: 'SU', path: '/session/signup' },
    ],
  },
  {
    name: 'CSE',
    icon: 'menu_book',
    children: [
      { name: 'Materials', iconText: 'SI', path: '/comprehesive/cse' },
      { name: 'Clubs', iconText: 'SU', path: '/session/signup' },
    ],
  },
  {
    name: 'School Management',
    icon: 'account_balance',
    children: [
      { name: 'Schools', iconText: 'SI', path: '/Schoolmgt/Schools' },
      { name: 'Add School', iconText: 'SU', path: '/session/signup' },
    ],
  },
  { label: 'Others', type: 'label' },
  {
    name: 'Data Entry',
    icon: 'assignment',
    children: [
      { name: 'Beneficiary Form', iconText: 'SI', path: '/session/signup' },
      { name: 'Disclaimer Form', iconText: 'SI', path: '/Disclim/Dis' },
      { name: 'Parental Consent form', iconText: 'SU', path: '/ParentCon/Parent' },
      { name: 'Transfer Form', iconText: 'SI', path: '/Transfer/Transfer' },
      { name: 'Weekly Board Facility', iconText: 'SU', path: '/Board/Boarding' },
    ],
  },
  {
    name: 'Report',
    icon: 'assessment',
    children: [
      { name: 'All reports', iconText: 'SI', path: '/session/signup' },
    ],
  },


  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' },
    ],
  },
];
