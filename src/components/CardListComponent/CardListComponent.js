import React, { Component } from 'react';
import { connect } from 'react-redux';

class CardList extends Component {

    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
    this.props.dispatch({ type: 'GET_CARDS'});
    }

    // note I will need to add in conditanol rendering according to what 
    // the conditanol rendering will be base off of what page you are in
    // it will change how the map function works however everything else
    // will come from this page.
  render() {
    return (
      <div>
        {this.props.cards.map(item => <p>{item.card_name}</p>)}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(CardList);