import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDraftMapComponent from './UserDraftedComponet';
import UserCardSelector from './userSelectComponent';
import Grid from '@material-ui/core/Grid';

class CardList extends Component {
    // to pass between child and child need at this state level might put into reducer later.
    state = {
        selectedCardId: '',
        selectedCardName: '',
        selectedCardUrl: '',

    }

    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
        this.props.dispatch({ type: 'GET_ADMIN_VALUES' });// only get the default card values/card info
        this.props.dispatch({ type: 'GET_USER_CARDS', payload: { user_id: this.props.user.id } });
    }
    // selected card is picked this function runs.
    handleSelect = (cardid, cardname, cardurl) => (event) => {
        this.setState({
            selectedCardId: cardid,
            selectedCardName: cardname,
            selectedCardUrl: cardurl,
        })
        this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN', payload: { cardname } });// will get all the card values
    }
    // this is a filter for combining the diffrent list to give the ones I want. It might be the cause for the Dom is not updating properly.
    modifyItem = (item, parentcard) => {
        for (let i = 0; i < this.props.usercards.length; i++) {
            if (!this.props.usercards[i].is_default) {
                if (this.props.usercards[i].card_id === item.card_id && this.props.usercards[i].parent_card_id === this.state.selectedCardId) {
                    item = {
                        ...item,
                        [parentcard]: this.props.usercards[i].user_card_value,
                        isModifided: true,
                    }
                }
            }
        }
        return item
    }

    render() {
        return (
            <div>
<Grid container
        justify="space-evenly"
        alignItems="center"
        alignItems="flex-start"
      >
                {this.state.selectedCardId ? <div><h1> Selected Card: {this.state.selectedCardName} </h1>
                <img src={this.state.selectedCardUrl} /></div> : null}

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {this.state.selectedCardId ? <th>Input Change Value</th> : <th>Select Card</th>}
                            {this.state.selectedCardId ? <th>Submit</th> : null}
                        </tr>
                    </thead>
                    {/* allCardValues */}
                    <tbody>
                        {/* force update did not update the component on new update. might of been a proplem with my callback though.*/}
                        {/* fist check is if a card is selected if a card is seleted the first one runs and is the selected card values 
                        second compont is the user selecting which card to pick.
                        */}
                        {this.state.selectedCardId ? this.props.selectedCardValues.map(item => <UserDraftMapComponent item={this.modifyItem(item, this.state.selectedCardName.toLowerCase())}
                            key={item.card_id}
                            handleSelect={this.handleSelect}
                            parentCardId={this.state.selectedCardId}
                            parentCardName={this.state.selectedCardName}
                            parentCardURL={this.state.selectedCardUrl} />): this.props.adminCardValues.map(item => <UserCardSelector item={item}
                                key={item.card_id}
                                handleSelect={this.handleSelect} />)}
                    </tbody>
                </table>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(CardList);