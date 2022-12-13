import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
import { SnackbarProvider } from 'notistack';


const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <SnackbarProvider 
            preventDuplicate
            maxSnack={1}
            anchorOrigin={{horizontal: 'right', vertical:'bottom'}}
            TransitionProps={{ direction: 'up'}}
          >
            <AuthProvider>{content}</AuthProvider>
          </SnackbarProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
