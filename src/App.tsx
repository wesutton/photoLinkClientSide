import React, { useEffect, useState} from 'react'; 
import Sitebar from './home/Navbar';
import SplashBar from './home/Splashbar';
import Auth from './auth/Auth'
import HomePage from './home/App';
import './App.css';
import Footer from './home/Footer'



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
    return (sessionToken === localStorage.getItem('token') ? <HomePage clickLogout={clearToken} updateToken={updateToken} token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return (
    <div className="App">
      <Sitebar />
      {protectedViews()}
    <div> 
      <Footer/>
    </div>
   
    </div>  
  );
}

export default App;
