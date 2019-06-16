import React from 'react';
import './App.css';

import { connect } from "react-redux";
import { getFlights, deleteFlights, addFlights } from './actions/flightsActions';

import _ from 'lodash';

import Navbar from './Navbar';
import ListView from './ListView';



import { withStyles } from '@material-ui/styles';



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

const flightType = {
    CHEAP: 'cheap',
    BUSINESS: 'business'
}

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {
        return (
            <div>
                <Navbar />
                <ListView />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { flights: state.flights }
}

const mapDispatchToProps = {
    getFlights,
    deleteFlights,
    addFlights
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(
    withStyles(useStyles)(App)
);