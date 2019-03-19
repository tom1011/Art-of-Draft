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
        this.props.dispatch({ type: 'GET_CARDS' });
        this.props.dispatch({ type: 'GET_ADMIN_VALUES' });
    }
    handleSelect= (cardid, cardname) => (event) =>{
        console.log('logging id then name', cardid, cardname)
        this.setState({
            selectedCardId: cardid,
            selectedCardName: cardname,
        })
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
                    <tbody>
                        {this.state.selectedCardId ? this.props.adminCardValues.map(item => <AdminDraftMapComponent item={item}
                                 key = {item.card_id} 
                                 handleSelect={this.handleSelect}
                                 parentCardId = {this.state.selectedCardId}
                                 parentCardName = {this.state.selectedCardName}/>) : this.props.adminCardValues.map(item => <DraftCardSelector item={item}
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