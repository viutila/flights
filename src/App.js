import React from 'react';
import './App.css';

import { connect } from "react-redux";
import { getFlights } from './actions/flightsActions';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.props.getFlights();
  }
  render() {
    return <h1>Hello, foo</h1>;
  }
}

function mapStateToProps(state) {
	return { flights: state.flights }
}

const mapDispatchToProps = {
  getFlights
}

export default connect(mapStateToProps, mapDispatchToProps)(App);