import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardMapComponent from './CardMapComponent';

class CardList extends Component {
  state = {
    filter: ''
  }

  setfilter = (event) => {
    this.setState({
      ...this.state,
      filter: event.target.value
    })
  }

  render() {
    console.log('this is card list component looking to see if render')
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
             this.props.draftedCardValues.filter(card => card.color_name === this.state.filter)
            //  this will show the filter list of cards on the draft screen.
             .map(item => <CardMapComponent item={item} key={item.card_id} />) : this.props.draftedCardValues
             .map(item => <CardMapComponent item={item} key={item.card_id} />) }
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