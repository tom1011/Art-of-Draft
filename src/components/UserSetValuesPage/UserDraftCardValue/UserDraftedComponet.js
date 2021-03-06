import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


class AdminCardValueList extends Component {

    state = {
        cardInfo: {
            id: this.props.item.card_id,
            card_value: this.props.item[this.props.parentCardName.toLowerCase()],
            begincard_value: this.props.item.default_value,
            parentCard: this.props.parentCardId,
            parentCardName: this.props.parentCardName,
            user_id: this.props.user.id,
            parentCardURL: this.props.img_url,
        }
    }

    handleChange = (event) => {
        // console.log('in admin handle change function', event.target.value)
        // console.log(this.state.cardInfo)
        this.setState({
            cardInfo: {
                ...this.state.cardInfo,
                card_value: event.target.value,
            }
        })
    }

    handleSubmint = (id) => (event) => {
        // console.log('in handlesubmit logging id then parent card id', id, "this.state.cardInfor", this.state.cardInfo.parentCard)
            // console.log('in handlesubmit', id)
            // need to do a put/post here. put updates post adds.
            if (this.state.cardInfo.begincard_value !== this.state.card_value && this.props.item.isModifided) {
                // put
                this.props.dispatch({ type: 'PUT_USER_CARD_VALUES', payload: this.state.cardInfo })
            } else if (this.state.cardInfo.card_value){
                //post
                this.props.dispatch({ type: 'POST_USER_CARD_VALES', payload: this.state.cardInfo })
            }
            else {
                console.log("error posting/updating DB Check value to make sure you typed it in")
            }
        }

    render() {
        console.log('this is the mapped component for the card drated values user.')
        return (
            <tr>
                <td>{this.props.item.card_name}</td>
                <td><input type="number" min="-100" max="100" step="0.1" value={this.state.cardInfo.card_value} onChange={this.handleChange} placeholder="default card value" /></td>
                <td><Button variant="contained" color="primary"  onClick={this.handleSubmint(this.props.item.card_id)}>Submit</Button></td>
            </tr>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminCardValueList);