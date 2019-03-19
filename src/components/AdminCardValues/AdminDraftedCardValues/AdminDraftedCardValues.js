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
        console.log(this.state)
        return (
            <div>
                
                {this.state.selectedCardId ? <h1> Selected Card: {this.state.selectedCardName} </h1> : null } 
                
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            {!this.state.selectedCardId ? <th>Select Card</th> : null}
                            {this.state.selectedCardId ? <th>Input Change Value</th> : null }
                            {this.state.selectedCardId ? <th>Submit</th> : null }
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.selectedCardId ? this.props.adminCardValues.
                            map(item => <DraftCardSelector item={item}
                                 key = {item.id} 
                                 handleSelect={this.handleSelect}/>) : null}
                        {this.state.selectedCardId ? this.props.adminCardValues.
                            map(item => <AdminDraftMapComponent item={item}
                                 key = {item.id} 
                                 handleSelect={this.handleSelect}
                                 parentCardId = {this.state.selectedCardId}/>) : null}
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