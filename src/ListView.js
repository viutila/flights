import React from 'react';

import { connect } from "react-redux";
import { getFlights, deleteFlights, clearFlights } from './actions/flightsActions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

import CircularIndeterminate from './CircularIndeterminate';



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
        position: 'relative'
    },
    paper: {
        width: '100%',
        marginBottom: '5px',
        marginTop: '10px'
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
    }

    componentDidMount() {
        const data = this.getFlightsData();
        if (data.length === 0) {
            this.props.getFlights(flightType.CHEAP);
        }
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

    setFlightType = (flightType) => {
        this.setState({ flightType });
    }


    handleRequestSort = (event, property) => {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setOrder(isDesc ? 'asc' : 'desc');
        this.setOrderBy(property);
    }

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const rows = this.getFlightsData();
            const newSelecteds = rows.map(n => this.handleSelectedValue(n));
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

    handleSelectedValue(item) {
        if (this.state.flightType === flightType.CHEAP) {
            return item.route + ';' + item.departure + ';' + item.arrival;
        } else if (this.state.flightType === flightType.BUSINESS) {
            return item.departure + ';' + item.arrival + ';' + item.departureTime + ';' + item.arrivalTime;
        }
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

    changeFlightType = (event) => {
        console.log(event);
        if (this.state.flightType !== event.target.value) {
            this.props.clearFlights();
            this.props.getFlights(event.target.value)
            this.setFlightType(event.target.value);
            this.setSelected([]);
        }
    }

    renderTableCell01(row) {
        if (this.state.flightType === flightType.CHEAP) {
            return (
                <TableCell align="left">
                    {row.route}
                </TableCell>
            )
        }
        return null;
    }

    renderTableCell02(row) {
        if (this.state.flightType === flightType.BUSINESS) {
            return (
                <TableCell align="left">
                    {row.departure}
                </TableCell>
            )
        }
        return null;
    }

    renderTableCell03(row) {
        if (this.state.flightType === flightType.BUSINESS) {
            return (
                <TableCell align="left">
                    {row.arrival}
                </TableCell>
            )
        }
        return null;
    }

    renderLoadingDiv() {
        if (this.props.flights.fetching) {
            return <CircularIndeterminate />
        }
        return null;
    }

    render() {

        const { classes } = this.props;
        console.log(classes.root)
        const rows = this.getFlightsData();

        const isSelected = name => this.state.selected.indexOf(name) !== -1;
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

        return (
            <div className={classes.root}>
                <Select
                    value={this.state.flightType}
                    onChange={this.changeFlightType}
                    inputProps={{
                        name: 'FlightType',
                        id: 'FlightType-simple',
                    }}
                >
                    <MenuItem value={flightType.CHEAP}>Cheap</MenuItem>
                    <MenuItem value={flightType.BUSINESS}>Business</MenuItem>
                </Select>

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
                                flightType={this.state.flightType}
                            />
                            <TableBody>
                                {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(this.handleSelectedValue(row));
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, this.handleSelectedValue(row))}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                {this.renderTableCell01(row, labelId)}
                                                {this.renderTableCell02(row, labelId)}
                                                {this.renderTableCell03(row, labelId)}
                                                <TableCell align="left">{this.getDateStr(row.departureTime || row.departure)}</TableCell>
                                                <TableCell align="left">{this.getDateStr(row.arrivalTime || row.arrival)}</TableCell>
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

                {this.renderLoadingDiv()}
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
    clearFlights
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(
    withStyles(useStyles)(ListView)
);