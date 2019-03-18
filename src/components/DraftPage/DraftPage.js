import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListComponent from '../CardListComponent/CardListComponent';

class DraftPage extends Component {

  render() {
    return (
      <div>
        <p>Draft plage set up</p>
        <ListComponent />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(DraftPage);
