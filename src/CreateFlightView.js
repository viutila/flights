import React from 'react';

import { connect } from "react-redux";
import { addFlights } from './actions/flightsActions';

import { withStyles } from '@material-ui/styles';

import SimpleForm from './SimpleForm';


const useStyles = {
    root: {
        padding: '20px',
    },
    paper: {
        width: '100%',
        marginBottom: '5px',
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
};


class CreateFlightView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log( event, this.props.form);
        this.props.addFlights(this.props.form.values);
    }

    render() {
        return (
            <SimpleForm handleSubmit={this.handleSubmit.bind(this)} />
        );
    }
}

function mapStateToProps(state) {
    return { form: state.form.syncValidation }
}

const mapDispatchToProps = {
    addFlights
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(
    withStyles(useStyles)(CreateFlightView)
);