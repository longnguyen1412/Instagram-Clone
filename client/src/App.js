import './App.css';

import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import {createContext, useEffect, useReducer} from 'react';

import NavBar from './Components/Navbar';
import Home from './Components/screens/Home';
import Profile from './Components/screens/Profile';
import Signup from './Components/screens/Signup';
import Login from './Components/screens/Login';
import CreatePost from './Components/screens/CreatePost';
import {reducer, initialState} from './Reducers/userReducer';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(!user) {
      history.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  return(
    <Switch>
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
    </Switch>
  )
}

function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  const [state, dispatch] = useReducer(reducer, user || initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <div className="container-ig mt-54">
          <Routing></Routing>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
