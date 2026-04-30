import '@/styles/global/_index.scss';
import CurrentUser from '@/containers/CurrentUser';
import RoutesSwitch from '@/Router';
import AppLayout from '@/containers/AppLayout';

function App() {
  return (
    <CurrentUser>
      <AppLayout>
        <RoutesSwitch />
      </AppLayout>
    </CurrentUser>
  );
}

export default App;
