import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const User = Loadable(lazy(() => import('../pages/usersmanagement/user')));
const Adduser = Loadable(lazy(() => import('../pages/adduser/add')));
const Benefi = Loadable(lazy(() => import('../pages/beneficiarymanagement/beneficiaries')));
const Schols = Loadable(lazy(() => import('../pages/Schoolmgt/Schools') ));
const Comsex = Loadable(lazy(() => import('../pages/comprehesive/cse')));
const WeeklyBoard = Loadable(lazy(() => import('../pages/dataEntry/Board/Boarding')));
const Disclaimerform= Loadable(lazy(() => import('../pages/dataEntry/Disclim/Dis')));
const Parentform= Loadable(lazy(() => import('../pages/dataEntry/ParentCon/Parent')));
const Transferform= Loadable(lazy(() => import('../pages/dataEntry/Transfer/Transfer')));



const AppTable = Loadable(lazy(() => import('./tables/AppTable')));
const AppForm = Loadable(lazy(() => import('./forms/AppForm')));
const AppButton = Loadable(lazy(() => import('./buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('./icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('./AppProgress')));
const AppMenu = Loadable(lazy(() => import('./menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('./checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('./switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('./radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('./slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('./dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('./snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('./auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('./expansion-panel/AppExpansionPanel')));

const materialRoutes = [

  {
    path: '/Board/Boarding',
    element: <WeeklyBoard/>
  },
  {
    path: '/Transfer/Transfer',
    element: <Transferform/>
  },
  {
    path: '/ParentCon/Parent',
    element: <Parentform/>
  },
  {
    path: '/Disclim/Dis',
    element: <Disclaimerform/>
  },
  {
    path: '/usermanagement/user',
    element: <User/>
  },
  {
    path: '/comprehesive/cse',
    element: <Comsex/>
  },
  {
    path: '/adduser/add',
    element: <Adduser/>
  },
  {
    path: '/beneficiarymanagement/beneficiaries',
    element: <Benefi/>
  },
  {
    path: '/Schoolmgt/Schools',
    element: <Schols/>
  },




  
  {
    path: '/material/table',
    element: <AppTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },
];

export default materialRoutes;
