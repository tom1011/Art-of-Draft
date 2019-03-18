import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardMapComponent from './CardMapComponent';

class CardList extends Component {

  componentDidMount = () => {
    this.getCards()
  }

  getCards = () => {
    this.props.dispatch({ type: 'GET_CARDS' });
  }

  render() {

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>{window.location.href.split('/').pop() === 'draft' ? "Card Draft Value" : null}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {window.location.href.split('/').pop() === 'draft' ? this.props.cards.map(item => <CardMapComponent item={item} key={item.card_id}/>) : null}
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