import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import DraftPage from '../DraftPage/DraftPage';
import AdminDefaultCardValuePage from '../AdminCardValues/AdminCardValues';
import AdminDefaultDraftCardValuePage from '../AdminCardValues/AdminDraftedCardValues/AdminDraftedCardValues';
import userSetDefault from '../UserSetValuesPage/UserSetValues';
import userSetDraftValues from '../UserSetValuesPage/UserDraftCardValue/UserDrafted';

import './App.css';
// material ui below
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import {createMuiTheme} from '@material-ui/core/styles';
// this is an object with many diffrent features of the colors
import red from '@material-ui/core/colors/red';
// end import material ui

const theme = createMuiTheme ({
  palette: {
    primary: {
      light: '#2196f3',
      main: '#2c387e',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {light: '#ffea00',
    main: '#b28900',// amber
    dark: '#000000',//black
    contrastText: '#fff',}
    ,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2, // black magic use for each theme.
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/draft"
              component={DraftPage}
            />
            <ProtectedRoute
              exact
              path="/adminDefault"
              component={AdminDefaultCardValuePage}
            />
            <ProtectedRoute
              exact
              path="/adminDraftDefault"
              component={AdminDefaultDraftCardValuePage}
            />
            <ProtectedRoute
              exact
              path="/userSetDefault"
              component={userSetDefault}
            />
            <ProtectedRoute
              exact
              path="/userSetDraftValues"
              component={userSetDraftValues}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
      </MuiThemeProvider>
  )}
}

export default connect()(App);
