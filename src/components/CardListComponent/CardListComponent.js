import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardMapComponent from './CardMapComponent';

class CardList extends Component {
  state = {
    filter: ''
  }

  setfilter = (event) => {
    console.log('in filter color logging colors', event.target.value)
    this.setState({
      ...this.state,
      filter: event.target.value
    })
  }

  componentDidMount = () => {
    this.getCards()
  }

  getCards = () => {
    this.props.dispatch({ type: 'GET_ADMIN_VALUES' });// this is base card values ie unchanging.
    this.props.dispatch({ type: 'GET_CARDS' });// this will get the user card info
    this.props.dispatch({ type: 'GET_USER_CARDS', payload: {user_id: this.props.user.id}})
  }

  modifyItem = (item) => {

    for (let i = 0; i < this.props.usercards.length; i++){  
      if (this.props.usercards[i].is_default && 
        item.card_id === this.props.usercards[i].card_id) {
          item={
            ...item,
            default_value: this.props.usercards[i].user_card_value
          }
      }
    }
    
    if (this.props.cardSelected.id){
      for (let i = 0; i < this.props.usercards.length; i++){  
        if (!this.props.usercards[i].is_default 
          && this.props.usercards[i].parent_card_id === this.props.cardSelected.id
          && this.props.usercards[i].card_id === item.card_id){
          // cardSelected.id
          let userNumber = Number(this.props.usercards[i].user_card_value);
          let defaultNumberuser = (Number(item.default_value));
          let tempvar = defaultNumberuser + userNumber;
          item = {
            ...item,
            default_value: tempvar,
          }
        } 
        }
    }

    return item
  }

  render() {
    return (
      <div>
        <select onChange={this.setfilter}>
        <option value = '' onChange={this.setfilter}>Filter list</option>
          <option value='red' onChange={this.setfilter}>Color: Red</option>
          <option value='blue' onChange={this.setfilter}>Color: Blue</option>
          <option value='green' onChange={this.setfilter}>Color: Green</option>
          <option value='black' onChange={this.setfilter}>Color: Black</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>{window.location.href.split('/').pop() === 'draft' ? 'Card Draft Value' : null}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
             {/* will render default screen for draft ie name card draft value and show default values.*/}
            {window.location.href.split('/').pop() === 'draft' && this.state.filter ?
             this.props.adminCardValues.filter(card => card.color_name === this.state.filter)
            //  this will show the filter list of cards on the draft screen.
             .map(item => <CardMapComponent item={this.modifyItem(item)} key={item.card_id} />) : this.props.adminCardValues
             .map(item => <CardMapComponent item={this.modifyItem(item)} key={item.card_id} />) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapStateToProps)(CardList);