import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            console.log('in update')
            this.props.dispatch({ type: 'PUT_CARD_ADMIN', payload: this.state.cardInfo })
            // diffrent but similar routes so do the :id ie delete method for 
        } else if (this.state.cardInfo.card_value){
            console.log('in post')
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
                <td><button onClick={this.handleSubmint(this.props.item.card_id)}>Submit</button></td>
            </tr>

        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminCardValueList);