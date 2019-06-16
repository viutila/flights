import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';

const flightTypeEnum = {
    CHEAP: 'cheap',
    BUSINESS: 'business'
}

const headRows = [
    { id: 'route', numeric: false, disablePadding: true, label: 'Route' },
    { id: 'departure', numeric: false, disablePadding: false, label: 'Departure' },
    { id: 'arrival', numeric: false, disablePadding: false, label: 'Arrival' },
];

const headRows01 = [
    { id: 'departure', numeric: false, disablePadding: false, label: 'Departure' },
    { id: 'arrival', numeric: false, disablePadding: false, label: 'Arrival' },
    { id: 'departureTime', numeric: false, disablePadding: false, label: 'Departure Time' },
    { id: 'arrivalTime', numeric: false, disablePadding: false, label: 'Arrival Time' },
];

export default function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, flightType } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    let headRowsRst = [];

    if (flightType === flightTypeEnum.CHEAP) {
        headRowsRst = headRows;
    } else if (flightType === flightTypeEnum.BUSINESS) {
        headRowsRst = headRows01;
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'Select all desserts' }}
                    />
                </TableCell>
                {headRowsRst.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};