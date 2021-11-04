import React, { useEffect, useState} from 'react'; 
import Sitebar from './home/Navbar';
import Auth from './auth/Auth'
import HomePage from './home/App';
import './App.css';

const App: React.FC = () => {

  const [sessionToken, setSessionToken] = useState<string |null>(null);

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken: any) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('')
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <HomePage token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (
    <div className="App">
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
