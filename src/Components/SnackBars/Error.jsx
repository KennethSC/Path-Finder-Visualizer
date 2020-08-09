import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props){return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Snack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
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

    render() {
        const { open } = this.state;
        return (
        <div>
            <Snackbar
                onClose={this.handleClose}
                autoHideDuration={11000}
                open={open}
            >
            <Alert severity="error" onClose={this.handleClose}>
              No Possible Path Found!
            </Alert>
          </Snackbar>

        </div>
    );
  }
}
