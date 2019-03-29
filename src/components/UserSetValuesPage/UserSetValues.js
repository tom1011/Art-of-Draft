import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserMapComponent from './UserMapComponent';
import Grid from '@material-ui/core/Grid';

class CardList extends Component {


    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
        this.props.dispatch({ type: 'GET_USER_CARDS', payload: {user_id: this.props.user.id} });
        this.props.dispatch({ type: 'GET_ADMIN_VALUES' });
    }

    // this function takes in the map item and finds where a user has modifided the values to be diffrent.
    modifyItem = (item) => {
        for (let i = 0; i < this.props.usercards.length; i++){
            if (this.props.usercards[i].is_default && this.props.usercards[i].card_id === item.card_id){

                item = {
                    ...item,
                    default_value: this.props.usercards[i].user_card_value,
                    isModifided: true,
                }
            }
        }
        return item
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Grid item xs={3}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>input value</th>
                            <th>Submit Button</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.props.adminCardValues.map(item => <UserMapComponent 
                         item={this.modifyItem(item)}
                          key={item.card_id}/>)}
                    </tbody>
                </table>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(CardList);