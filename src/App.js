import React from 'react';
import './App.css';

import { connect } from "react-redux";
import Navbar from './Navbar';
import ListView from './ListView';
import CreateFlightView from './CreateFlightView';
import { withStyles } from '@material-ui/styles';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';



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


class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" render={(match) => <Navbar match={match} />} />
                    <Switch>
                        <Route exact path="/create" render={() => <CreateFlightView />} />
                        <Route exact path="/" render={() => <ListView />} />
                        <Route exact path="/list" render={() => <ListView />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return { flights: state.flights }
}

export default connect(
    mapStateToProps
)(
    withStyles(useStyles)(App)
);