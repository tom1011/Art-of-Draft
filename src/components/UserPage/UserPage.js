import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import './UserPage.css';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <h1 id="welcome">
        Welcome, {props.user.username}!
    </h1>
    </Grid>
    <Grid 
    container
    direction="row"
    justify="space-around"
    alignItems="center"
    >
    <Grid>
      <div class="tooltip">
      <span class='tooltiptextdraft'>The draft page is where you can simulate your draft to help get an idea of what to draft next!</span>
    <a href="#/draft" class="fas fa-khanda" style={{textDecoration: "none", fontSize: '10em' ,color: '#b28900', background: '#D4DCE4'}}></a>
    </div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
    <Button href="#/draft" color='primary' variant="contained" >Draft</Button>
    </Grid>
    </Grid>
    <Grid>
    <div class="tooltip">
      <span class='tooltiptextdefault'>This is where you can set the initial value for cards. ie rank the cards acording to the order you want to draft them.</span>
    <a href="#/userSetDefault" class="fas fa-haykal" style={{textDecoration: "none", fontSize: '10em' ,color: '#b28900', background: '#D4DCE4', outline: 'none'}}></a>
    </div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
    <Button href="#/userSetDefault" color='primary' variant="contained" >Default Values</Button>
    </Grid>
    </Grid>
    <Grid>
    <div class="tooltip">
      <span class='tooltiptextdrafted'>On this page you can select a card and then input the value that you want the cards to change by when you draf that specific card.</span>
    <a href="#/userSetDraftValues" class="fas fa-cogs" style={{textDecoration: "none", fontSize: '10em' ,color: '#b28900', background: '#D4DCE4'}}> </a>
    </div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
    <Button href="#/userSetDraftValues" color='primary' variant="contained" >Drafted Values</Button>
    </Grid>
    </Grid>
    <Grid>
    <div class="tooltip">
    <span class = 'infopage'>to the info page I need to put stuff into it.</span>
    <a href="#/info" class="fas fa-info" style={{textDecoration: "none", fontSize: '10em' ,color: '#b28900', background: '#D4DCE4'}}> </a>
    </div>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="left"
    >
    <Button href="#/info" color='primary' variant="contained" >Info Page</Button>
    </Grid>
    </Grid>
      </Grid>


      
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <LogOutButton className="log-in" />
      </Grid>
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
