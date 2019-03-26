import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminDraftMapComponent from './AdminDraftCardValuesComponent';
import DraftCardSelector from './AdminSelectComponet';

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
    }

    handleSelect= (cardid, cardname) => (event) =>{
        console.log('logging id then name', cardname)
        this.setState({
            selectedCardId: cardid,
            selectedCardName: cardname,
        })
        this.props.dispatch({ type: 'GET_CARD_VALUE_ADMIN' ,payload: {cardname}});// will get all the card values
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
                        {this.state.selectedCardId ? this.props.selectedCardValues.map(item => <AdminDraftMapComponent item={item}
                                 key = {item.card_id} // this is the map that shows selected cards
                                 handleSelect={this.handleSelect}
                                 parentCardId = {this.state.selectedCardId}
                                 parentCardName = {this.state.selectedCardName}/>) : 
                                 this.props.adminCardValues.map(item => <DraftCardSelector item={item}
                                    key = {item.card_id} // so I want to make this a popover/model idk witch.
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