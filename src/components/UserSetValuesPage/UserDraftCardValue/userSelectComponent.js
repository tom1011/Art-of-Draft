import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminDraftCardValueList extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.card_name}</td>
                <td><button onClick={this.props.handleSelect(this.props.item.card_id, this.props.item.card_name)}>Submit</button></td>
            </tr>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminDraftCardValueList);