import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import pageRoutes from 'app/views/pages/PageRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...pageRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="session/signin" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
