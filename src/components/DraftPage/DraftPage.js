import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListComponent from '../CardListComponent/CardListComponent';
import CurrentDrafted from '../DraftSelected/DraftSelectedList';

class DraftPage extends Component {
  state= {
    cardSelected: {
    id: '',
    name: '',
    },
    toggleSelect: false,
  }

  handleSelectDraft= (cardid, cardname) => (event) =>{
    console.log('logging id then name', cardname)
    this.setState({
      ...this.state,
      cardSelected: {
        id: cardid,
        name: cardname,
      }
    })
    this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN' ,payload: {cardname}});// will get all the card values with the specified name.
}

toggleSelectfunction = () => {
  this.setState({
    ...this.state,
    toggleSelect: !this.state.toggleSelect
  })
}

  render() {
    return (
      <div>
        <p>Draft plage set up</p>
        <button onClick={this.toggleSelectfunction}>Add Drafted Card</button>
        { this.state.toggleSelect ? <CurrentDrafted  handleSelectDraft= {this.handleSelectDraft} selectedCardId= {this.state.cardSelected.id} selectedCardName={this.state.cardSelected.name}/> : null} 
        <div>
        <ListComponent cardSelected={this.state.cardSelected}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(DraftPage);
