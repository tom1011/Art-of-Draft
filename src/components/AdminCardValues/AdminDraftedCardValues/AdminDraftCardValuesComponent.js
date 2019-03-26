import React, { Component } from 'react';
import { connect } from 'react-redux';



class AdminCardValueList extends Component {

    state = {
        // cardInfo: {
        //     id: this.props.item.card_id,
            // card_value: this.props.item[this.props.parentCardName.toLowerCase()],
        //     begincard_value: this.props.item.default_value,
        //     parentCard: this.props.parentCardId,
        //     parentCardName: this.props.parentCardName
        // }
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
        if (this.state.cardInfo.card_value !== this.state.begincard_value) {
            console.log('in post')
            this.props.dispatch({ type: 'PUT_ALL_CARD_ADMIN', payload: this.state.cardInfo })
        }
        // else {
        //     console.log("error posting/updating DB Check value to make sure you typed it in")
        // }
    }

    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
        console.log('in the get cards dispatch')
    this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN' ,payload: {cardname: this.props.selectedCardName}})
    }

    render() {

        if (this.props.selectedCardValues) {
            console.log(this.props.selectedCardValues)
        return (
            <>
                {this.props.selectedCardValues.map(item =>
                <tr key={item.card_id}>
                    <td>{item.card_name}</td>
                    {console.log('logging this.', item)}
                    <td><input type="number" min="-100" max="100" step="0.1" value={item[this.props.selectedCardName.toLowerCase().split(' ').join('_')]} onChange={this.handleChange} placeholder="default card value" /></td>
                    <td><button onClick={this.handleSubmint(item.card_id)}>Submit</button></td>
                </tr>
                )}
            </>
        );
    }
}
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(AdminCardValueList);