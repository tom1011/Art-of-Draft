import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListComponent from '../CardListComponent/CardListComponent';
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
    cardSelected: {
      id: '',
      name: '',
    },
    toggleSelect: false,
    anchorEl: null,
  }

  handleSelectDraft = (cardid, cardname) => (event) => {
    console.log(this.props.draftedCardList , 'logging the reduc of this.props.drafted')
    this.setState({
      ...this.state,
      cardSelected: {
        id: cardid,
        name: cardname,
      },
    })
    this.props.dispatch({type: 'DRAFTED_CARD_LIST', payload: {cardname: cardname, cardid: cardid}})
    this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN', payload: { cardname } });// will get all the card values with the specified name.
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



  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    console.log('logging this.props.draftedCard list, ' , this.props.draftedCardList)

    return (
      
      <div>
        <p>Draft page set up</p>
        <div id='leftBox'>
        
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

            <CurrentDrafted handleSelectDraft={this.handleSelectDraft} selectedCardId={this.state.cardSelected.id} selectedCardName={this.state.cardSelected.name} />

          </Popover> </>}
        </div>
        <div id='rightBox'>
          <ListComponent cardSelected={this.state.cardSelected} />
        </div>
        <Button variant="contained" color='primary'>
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
