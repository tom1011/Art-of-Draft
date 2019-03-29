import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class AdminDraftCardValueList extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.card_name}</td>
                <td><Button variant="contained" color="secondary" onClick={this.props.handleSelect(this.props.item.card_id, this.props.item.card_name, this.props.item.img_url)}>Select</Button></td>
            </tr>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminDraftCardValueList);