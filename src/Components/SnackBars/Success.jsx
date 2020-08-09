import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Snack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: "47",
            time: '',
        };
    }

    handleClick = () => this.setState((prevState) => ({ open: !prevState.open }));
    handleClose = () => this.setState({ open: false });


    handleClose = () => {
        this.setState({ open: false })
    };

    openState = () => {
        this.setState({ open: true });
    };

    message = (msg) => {
        this.setState({ message: msg });
    };

    render() {
        const { open } = this.state;
        return (
        <div>
            <Snackbar
                autoHideDuration={11000}
                onClose={this.handleClose}
                open={open}
            >
            <Alert severity="success" onClose={this.handleClose}>
                Path Found! ( Path length: {this.state.message} steps )
            </Alert>
            </Snackbar>
            
        </div>
        );
    }
}

