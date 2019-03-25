import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminMapComponent from './AdminMapComponent';
import Grid from '@material-ui/core/Grid';


class CardList extends Component {


    componentDidMount = () => {
        this.getCards()
    }

    getCards = () => {
        this.props.dispatch({ type: 'GET_CARDS' });
        this.props.dispatch({ type: 'GET_ADMIN_VALUES' });
    }

    render() {
        console.log(this.props.adminCardValues);
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
                        {this.props.adminCardValues.map(item => <AdminMapComponent item={item} key={item.card_id}/>)}
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