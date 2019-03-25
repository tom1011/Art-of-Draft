import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
// import './Nav.css';


// material ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
      margin: theme.spacing.unit,
  },
})
// end material ui


const Nav = (props) => (
  <div>
      <AppBar position="relative">
      <Toolbar>
  {/* <div className="nav"> */}
  <Button color='primary'  variant="contained" href="home" >

      <h2 className>Art of Draft</h2>
    </Button>
    <div>
    <Button variant="contained" color="secondary" href="#/home">
      
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Button>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
        <Button variant="contained" color="secondary" href="#/draft">
            Draft Page
          </Button>
          <Button variant="contained" color="secondary" href="#/info">
          
            Info Page
          
          </Button>
          <Button variant="contained" color="secondary" href="#/adminDefault">
          
            admin Default Values Page
          
          </Button>
          <Button variant="contained" color="secondary" href="#/adminDraftDefault" >
          
            admin Draft Value
          
          </Button>
          <Button variant="contained" color="secondary" href="#/userSetDefault">
    
            user default Value
          
          </Button>
          <Button variant="contained" color="secondary" href="#/userSetDraftValues">
          
            user draft Value
           
          </Button>
          
          <LogOutButton />
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Button variant="contained" color="secondary" href="#/userSetDraftValues">
        About
      
      </Button>

</div>

      </Toolbar>
      </AppBar>
    </div>
);


// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default withStyles(styles)(connect(mapStateToProps)(Nav));
