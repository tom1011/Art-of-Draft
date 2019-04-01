import React, { Component } from 'react';
import { connect } from 'react-redux';



class AdminCardValueList extends Component {

    state = {
        cardInfo: {
            id: this.props.item.card_id,
            card_value: this.props.item[this.props.parentCardName.toLowerCase()],
            begincard_value: this.props.item.default_value,
            parentCard: this.props.parentCardId,
            parentCardName: this.props.parentCardName
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
        console.log('in handlesubmit logging id then parent card id', id, "this.state.cardInfor", this.state.cardInfo.parentCard)
        if (this.state.cardInfo.card_value !== this.state.begincard_value){
            console.log('in post')
            this.props.dispatch({ type: 'PUT_ALL_CARD_ADMIN', payload: this.state.cardInfo })
        }
        // else {
        //     console.log("error posting/updating DB Check value to make sure you typed it in")
        // }
    }

    componentDidMount() {
        console.log('in component did mount')
    }

    render() {
        console.log('in compont that i want to update showing render.', this.props.selectedCardValues)
        return (
            <tr>
                <td>{this.props.item.card_name}</td>
                <td><input type="number" min="-100" max="100" step="0.1" value={this.state.cardInfo.card_value} onChange={this.handleChange} placeholder="default card value" /></td>
                <td><button onClick={this.handleSubmint(this.props.item.card_id)}>Submit</button></td>
            </tr>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminCardValueList);