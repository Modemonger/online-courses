import { UserProvider } from './contexts/UserContext';
import NavBar from './components/navBar';

function App() {
  return (
    <UserProvider>
        <NavBar />
    </UserProvider>
  );
}

export default App;