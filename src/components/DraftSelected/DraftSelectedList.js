import React, { Component } from 'react';
import { connect } from 'react-redux';
import DraftCardSelector from './DraftSelectedComponent';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

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
                <Grid container
                    justify="space-evenly"
                    alignItems="center"
                    alignItems="flex-start"
                >
                    {this.props.adminCardValues.map(item => <Grid><DraftCardSelector item={item}
                        key={item.card_id}
                        handleSelect={this.props.handleSelectDraft} /></Grid>)}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(withStyles(styles)(CardList));