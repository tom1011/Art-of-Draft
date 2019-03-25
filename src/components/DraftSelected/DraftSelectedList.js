import React, { Component } from 'react';
import { connect } from 'react-redux';
import DraftCardSelector from './DraftSelectedComponent';

import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
})

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

                    
                    {/* allCardValues */}
                    
                        
                            <div>Card: Name</div>

                            {this.props.adminCardValues.map(item => <DraftCardSelector item={item}
                                key={item.card_id}
                            handleSelect={this.props.handleSelectDraft} />)}
                    
                
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(withStyles(styles)(CardList));