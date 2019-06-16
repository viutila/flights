import React from 'react';

import { connect } from "react-redux";
import { getFlights, deleteFlights, addFlights } from './actions/flightsActions';

import _ from 'lodash';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import { withStyles } from '@material-ui/styles';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';



function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


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

class ListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'route',
            selected: [],
            page: 0,
            dense: false,
            rowsPerPage: 5,
            flightType: flightType.CHEAP
        }
        this.props.getFlights(flightType.CHEAP);
    }

    setOrder = (order) => {
        this.setState({ order });
    }

    setOrderBy = (orderBy) => {
        this.setState({ orderBy });
    }

    setSelected = (selected) => {
        this.setState({ selected });
    }

    setPage = (page) => {
        this.setState({ page });
    }

    setDense = (dense) => {
        this.setState({ dense });
    }

    setRowsPerPage = (rowsPerPage) => {
        this.setState({ rowsPerPage });
    }



    handleRequestSort = (event, property) => {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setOrder(isDesc ? 'asc' : 'desc');
        this.setOrderBy(property);
    }

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const rows = this.getFlightsData();
            const newSelecteds = rows.map(n => this.handleSelectedValue(n.route, n.departure, n.arrival));
            this.setSelected(newSelecteds);
            return;
        }
        this.setSelected([]);
    }

    handleClick = (event, name) => {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selected.slice(1));
        } else if (selectedIndex === this.state.selected.length - 1) {
            newSelected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
        }

        this.setSelected(newSelected);
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    }

    handleChangeRowsPerPage = (event) => {
        this.setRowsPerPage(+event.target.value);
    }

    handleChangeDense = (event) => {
        this.setDense(event.target.checked);
    }



    handleSelectedValue(route, departure, arrival) {
        return route + ';' + departure + ';' + arrival;
    }

    getFlightsData() {
        if (this.props.flights.fetched) {
            return this.props.flights.flights.data;
        }
        return [];
    }

    getDateStr(timeStamp) {
        const date = new Date(timeStamp * 1000);
        const rst = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() +
            ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return rst;
    }

   handleInputChange = (event) => {
       const targetName = event.target.name;
       const targetValue = event.target.value;
       this.setState({
           [targetName]: targetValue
       });
   }

   createFlight = (e) => {
       const data = {
           route: this.state.inputRoute,
           departure: this.state.inputDeparture,
           arrival: this.state.inputArrival,
       };
       this.props.addFlights(this.state.flightType, data);

   }

    render() {

        const { classes } = this.props;
        console.log(classes.root)
        const rows = this.getFlightsData();

        const isSelected = name => this.state.selected.indexOf(name) !== -1;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>

                    <EnhancedTableToolbar
                        numSelected={this.state.selected.length}
                        itemSelected={this.state.selected}
                        flightType={this.state.flightType}
                        deleteFunc={this.props.deleteFlights}
                    />

                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={this.state.selected.length}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(this.handleSelectedValue(row.route,row.departure,row.arrival));
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, this.handleSelectedValue(row.route,row.departure,row.arrival))}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={this.handleSelectedValue(row.route,row.departure,row.arrival)}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.route}
                                                </TableCell>
                                                <TableCell align="right">{this.getDateStr(row.departure)}</TableCell>
                                                <TableCell align="right">{this.getDateStr(row.arrival)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
                    label="Dense padding"
                />


                <div style={{marginTop: '20px'}}>
                    <input type='text' name='inputRoute' value={this.state.inputRoute} onChange={this.handleInputChange}></input>
                    <input type='text' name='inputDeparture' value={this.state.inputDeparture} onChange={this.handleInputChange}></input>
                    <input type='text' name='inputArrival' value={this.state.inputArrival} onChange={this.handleInputChange}></input>
                    <button onClick={this.createFlight}>Create Flight</button>
                </div>
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
    withStyles(useStyles)(ListView)
);