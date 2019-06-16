import axios from "axios";

export function getFlights() {
    return function (dispatch) {
        dispatch({
            type: "GET_FLIGHTS"
        });

        const apiUrl = 'https://tokigames-challenge.herokuapp.com/api/flights/cheap';
        axios.get(apiUrl)
            .then((response) => {
                dispatch({
                    type: "GET_FLIGHTS_FULFILLED",
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: "GET_CURRENCIES_INFO_REJECTED",
                    payload: err
                })
            })
    }
}