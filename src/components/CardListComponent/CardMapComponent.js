import React, { Component } from 'react';
import { connect } from 'react-redux';

class CardList extends Component {



    render() {
        return (
            <tr>
                <td>{this.props.item.card_name}</td>
                <td>{this.props.item.default_value}</td>
            </tr>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(CardList);