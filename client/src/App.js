import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AuthRoute from './util/AuthRoute'

//REDUX
// import { Provider } from 'react-redux'
// import store from './redux/store'

import SideBar from './components/SideBar'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

let authenticated;

const token = localStorage.FBtoken

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false
  } else {
    authenticated = true
  }

} else {
  authenticated = false
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      {/* <Provider store={store}> */}
      <Router>
        <SideBar />
        <div className="container">
          <Switch>
            <AuthRoute exact path="/" component={Home} authenticated={authenticated} auth />
            <AuthRoute exact path="/login" component={Login} authenticated={authenticated} guest />
            <AuthRoute exact path="/register" component={Register} authenticated={authenticated} guest />
          </Switch>
        </div>
      </Router>
      {/* </Provider> */}
    </MuiThemeProvider>
  );
}

export default App;
