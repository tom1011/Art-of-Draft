import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
    typography: {
      margin: theme.spacing.unit * 2,
    },
  });

class AdminCardValueList extends Component {
    state = {
        cardInfo: {
            id: this.props.item.card_id,
            card_value: this.props.item.default_value,
            begincard_value: this.props.item.default_value,
        }
    }

    handleChange = (event) => {
        // console.log('in admin handle change function', event.target.value)
        console.log(this.state.cardInfo)
        this.setState({
            cardInfo: {
                ...this.state.cardInfo,
                card_value: event.target.value,
            }
        })
    }
    handleSubmint = (id) => (event) => {
        // console.log('in handlesubmit', id)
        if (this.state.cardInfo.card_value && this.state.cardInfo.begincard_value) {
            this.props.dispatch({ type: 'PUT_CARD_ADMIN', payload: this.state.cardInfo })
        } else if (this.state.cardInfo.card_value){
            this.props.dispatch({ type: 'POST_CARD_ADMIN', payload: this.state.cardInfo })
        }
        else {
            console.log("error posting/updating DB Check value to make sure you typed it in")
        }
    }
    render() {
        return (
            <tr>
                <td>{this.props.item.card_name}</td>
                <td><input type="number" min="0" max="100" step="0.1" value={this.state.cardInfo.card_value} onChange={this.handleChange} placeholder="default card value" /></td>
                <td><Button variant="contained" color="primary" onClick={this.handleSubmint(this.props.item.card_id)}>Submit</Button></td>
            </tr>

        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminCardValueList);