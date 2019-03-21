import React, { Component } from 'react';
import { connect } from 'react-redux';
import DraftCardSelector from './DraftSelectedComponent';

class CardList extends Component {

    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
        this.props.dispatch({ type: 'GET_ADMIN_VALUES' });// only get the default card values/card info
    }

    render() {

        return (
            <div>
                
                {this.props.selectedCardId ? <h1> Selected Card: {this.props.selectedCardName} </h1> : null } 
                
                <table>
                    <thead>
                    </thead>
                    {/* allCardValues */}
                    <tbody>
                        {this.props.selectedCardId ? null : this.props.adminCardValues.map(item => <DraftCardSelector item={item}
                                    key = {item.card_id} 
                                    handleSelect={this.props.handleSelectDraft}/>)}
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