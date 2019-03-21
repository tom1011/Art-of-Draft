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
        this.props.dispatch({ type: 'GET_USER_CARDS', payload: {user_id: this.props.user.id} });
    }

    handleSelect= (cardid, cardname) => (event) =>{
        console.log('logging id then name', cardname)
        this.setState({
            selectedCardId: cardid,
            selectedCardName: cardname,
        })
        this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN' ,payload: {cardname}});// will get all the card values
    }

    modifyItem = (item, parentcard) => {
        console.log('in modifyItem for selected card.')
        for (let i = 0; i < this.props.usercards.length; i++){
            if (!this.props.usercards[i].is_default &&
                 this.props.usercards[i].card_id === item.card_id
                  && this.props.parent_card_id === this.state.parentCardId){
                console.log('in if statement in for loop this should only log once for kanna.')
                item = {
                    ...item,
                    [parentcard]: this.props.usercards[i].user_card_value,
                    isModifided: true,
                }
                console.log('in if statment logging modified item hopefuly.', item)
            }
        }
        return item
    }

    render() {

        return (
            <div>
                
                {this.state.selectedCardId ? <h1> Selected Card: {this.state.selectedCardName} </h1> : null } 
                
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {this.state.selectedCardId ? <th>Input Change Value</th> : <th>Select Card</th> }
                            {this.state.selectedCardId ? <th>Submit</th> : null }
                        </tr>
                    </thead>
                    {/* allCardValues */}
                    <tbody>
                        {this.state.selectedCardId ? this.props.allCardValues.map(item => <UserDraftMapComponent item={this.modifyItem(item, this.state.selectedCardName.toLowerCase())}
                                 key = {item.card_id} 
                                 handleSelect={this.handleSelect}
                                 parentCardId = {this.state.selectedCardId}
                                 parentCardName = {this.state.selectedCardName}/>) : this.props.adminCardValues.map(item => <UserCardSelector item={item}
                                    key = {item.card_id} 
                                    handleSelect={this.handleSelect}/>)}
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