import './App.css';

import NavBar from './Components/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/screens/Home';
import Profile from './Components/screens/Profile';
import Signup from './Components/screens/Signup';
import Login from './Components/screens/Login';
import CreatePost from './Components/screens/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container-ig">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/create">
          <CreatePost />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
