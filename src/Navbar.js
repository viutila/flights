import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function Navbar(props) {
    let dValue = 0;
    switch(props.match.location.pathname) {
        case "/list": {
            dValue = 0;
            break;
        }
        case "/create": {
            dValue = 1
            break;
        }
        default:
            break;
    }

    const classes = useStyles();
    const [value, setValue] = React.useState(dValue);

    

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction component={Link} to="/list" label="Flights List" icon={<RestoreIcon />} />
            <BottomNavigationAction component={Link} to="/create" label="Create A Flight" icon={<FavoriteIcon />} />
        </BottomNavigation>
    );
}