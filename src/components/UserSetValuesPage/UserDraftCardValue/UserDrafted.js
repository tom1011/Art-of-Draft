import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDraftMapComponent from './UserDraftedComponet';
import UserCardSelector from './userSelectComponent';

class CardList extends Component {
    state = {
        selectedCardId: '',
        selectedCardName: '',

    }

    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
        this.props.dispatch({ type: 'GET_ADMIN_VALUES' });// only get the default card values/card info
        this.props.dispatch({ type: 'GET_USER_CARDS', payload: { user_id: this.props.user.id } });
    }

    handleSelect = (cardid, cardname) => (event) => {
        this.setState({
            selectedCardId: cardid,
            selectedCardName: cardname,
        })
        this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN', payload: { cardname } });// will get all the card values
    }

    modifyItem = (item, parentcard) => {
        for (let i = 0; i < this.props.usercards.length; i++) {
            // console.log('logging first statement, !this.props.usercards[i].is_default' , !this.props.usercards[i].is_default)
            // console.log('logging second and statment this.props.usercards[i].card_id',this.props.usercards[i].card_id, 'item.card_id',item.card_id )
            
            if (!this.props.usercards[i].is_default) {
                if (this.props.usercards[i].card_id === item.card_id && this.props.usercards[i].parent_card_id === this.state.selectedCardId) {
                    item = {
                        ...item,
                        [parentcard]: this.props.usercards[i].user_card_value,
                        isModifided: true,
                    }
                    //&& this.props.parent_card_id === this.state.selectedCardId

                }
            }

        }
        return item
    }

    render() {
        return (
            <div>

                {this.state.selectedCardId ? <h1> Selected Card: {this.state.selectedCardName} </h1> : null}

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
                        {this.state.selectedCardId ? this.props.selectedCardValues.map(item => <UserDraftMapComponent item={this.modifyItem(item, this.state.selectedCardName.toLowerCase())}
                            key={item.card_id}
                            handleSelect={this.handleSelect}
                            parentCardId={this.state.selectedCardId}
                            parentCardName={this.state.selectedCardName} />) : this.props.adminCardValues.map(item => <UserCardSelector item={item}
                                key={item.card_id}
                                handleSelect={this.handleSelect} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(CardList);