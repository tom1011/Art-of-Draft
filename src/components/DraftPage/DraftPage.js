import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListCardsComponent from '../CardListComponent/CardListComponent';
import CurrentDrafted from '../DraftSelected/DraftSelectedList';
import './DraftPage.css'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';



const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
})

class DraftPage extends Component {
  state = {
    toggleSelect: false,
    anchorEl: null,
  }

  handleSelectDraft = (cardid, cardname) => (event) => {
    this.props.dispatch({type: 'DRAFTED_CARD_LIST', payload: {cardname: cardname, cardid: cardid}})
    this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN', payload: { cardname } });// will get all the card values with the specified name.
    // this.props.dispatch({type: '', payload: this.props.selectedCardValues})
  }

  toggleSelectfunction = (event) => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
      toggleSelect: !this.state.toggleSelect
    })
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
    })
  }
  
  clearStates = () => {
    this.props.dispatch({type: 'DRAFTED_CARD_LIST_CLEAR'})
    this.setState({
        toggleSelect: false,
        anchorEl: null,
    })
  }

componentDidMount = () => {
  this.getCards()
}
  getCards =() => {
    // this is the dispatches in order of what I want to hit.
    // this.props.dispatch({ type: 'GET_ADMIN_VALUES' });// this is base card values ie unchanging.
    // this.props.dispatch({ type: 'GET_USER_CARDS', payload: {user_id: this.props.user.id}})
    // this.props.dispatch({ type: 'DRAFTED_CARD_VALUES_DEFAULT', payload: {user: this.props.usercards , admin: this.props.adminCardValues} });// this will get the user card info
    this.props.dispatch({ type: 'DRAFTED_CARD_VALUES_DEFAULT_SAGA' ,payload: {user_id: this.props.user.id} })
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      
      <div>
        <p>Draft page set up</p>
        <div id='leftBox'>
        {/*  bellow button is to select/add another card to the drafted list. */}
        {this.props.draftedCardList.length >= 1 ? this.props.draftedCardList.map(item => <div>{item.cardname}</div>): null }
        { this.props.draftedCardList.length >= 5 ? null : <>
          <Button onClick={this.toggleSelectfunction}
            aria-owns={open ? 'simplepopover' : undefined}
            aria-haspopup='true'
            variant="contained" color='secondary'
          >Add Drafted Card</Button>
          <Popover
            id='simplepopover' // this is the id we definded in the open above in aria-owns
            open={open}
            anchorEl={anchorEl}
            onClick={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',        
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}  
          >
          

            <CurrentDrafted handleSelectDraft={this.handleSelectDraft}/>
          </Popover> </>}
          {/* end adding card to list */}
        </div>
        <div id='rightBox'>
          <ListCardsComponent />
        </div>
        <Button variant="contained" color='primary' onClick={this.clearStates}>
          New Draft
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}

export default withStyles(styles)(connect(mapStateToProps)(DraftPage));
