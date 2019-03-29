import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import './Hover.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing.unit,
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "hidden",
        invisible: true,
        
    },
    root: {
        backgroundColor: "transparent"
    },
})

class SelectDraftedCard extends Component {

    state = {
        anchorEl: null,
    };

    handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handlePopoverClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <>
                <Typography
                    float='right'
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={this.handlePopoverOpen}
                    onMouseLeave={this.handlePopoverClose}
                >
                    <Button variant="contained" color='secondary' float='right' onClick={this.props.handleSelect(this.props.item.card_id, this.props.item.card_name)}>
                        {this.props.item.card_name}
                    </Button>
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={this.handlePopoverOpen}
                        onMouseLeave={this.handlePopoverClose}
                    >
                        <img src={this.props.item.img_url} />
                    </Typography>
                </Popover>
            </>

        );
    }
}

const mapStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(withStyles(styles)(SelectDraftedCard));