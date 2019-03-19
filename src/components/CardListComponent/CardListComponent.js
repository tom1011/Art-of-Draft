import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardMapComponent from './CardMapComponent';

class CardList extends Component {
  state = {
    filter: ''
  }

  // filterListFun = () => {
  //   console.log('in filterfunction logging this.state.filterlist', this.state.filterList)
  //   if (this.state.filter !== 0) {
  //     console.log('in filter if statement')
  //     this.setState({
  //       ...this.state,
  //       filterlist: this.props.adminCardValues.filter(card => card.color = this.filter)
  //     })
  //   }
  //   else
  //     this.setState({
  //       ...this.state,
  //       filterlist: this.props.adminCardValues
  //     })
  //     console.log('logging filterlist. = ', this.state.filterlist)
  // }

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
  }

  render() {
    console.log(this.props.adminCardValues.color_name)
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
          {window.location.href.split('/').pop() === 'draft' && !this.state.filter ?
             this.props.adminCardValues
             .map(item => <CardMapComponent item={item} key={item.card_id} />) : null}
             {/* will render default screen for draft ie name card draft value and show default values.*/}
            {window.location.href.split('/').pop() === 'draft' && this.state.filter ?
             this.props.adminCardValues.filter(card => card.color_name === this.state.filter)
            //  this will show the filter list of cards on the draft screen.
             .map(item => <CardMapComponent item={item} key={item.card_id} />) : null}
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