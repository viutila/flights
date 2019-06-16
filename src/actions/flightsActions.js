import axios from "axios";

export function getFlights(typeStr) {
    return function (dispatch) {
        dispatch({
            type: "GET_FLIGHTS"
        });

        const apiUrl = `https://tokigames-challenge.herokuapp.com/api/flights/${typeStr}`;
        axios.get(apiUrl)
            .then((response) => {
                dispatch({
                    type: "GET_FLIGHTS_FULFILLED",
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: "GET_FLIGHTS_REJECTED",
                    payload: err
                })
            })
    }
}

export function deleteFlights(typeStr, dataList) {
    return function (dispatch) {
        dispatch({
            type: "DELETE_FLIGHTS"
        });

        let data = dataList.map((item) => {
            const spAry = item.split(';');
            return {
                route: spAry[0],
                departure: spAry[1],
                arrival: spAry[2]
            }
        });
        console.log(data);

        const apiUrl = `https://tokigames-challenge.herokuapp.com/api/flights/${typeStr}`;
        axios.delete(apiUrl, data)
            .then((response) => {
                dispatch({
                    type: "DELETE_FLIGHTS_FULFILLED",
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: "DELETE_FLIGHTS_REJECTED",
                    payload: err
                })
            })
    }
}


export function addFlights(typeStr, dataObj) {
    return function (dispatch) {
        dispatch({
            type: "ADD_FLIGHTS"
        });

        const data = dataObj;
        console.log(data);

        const apiUrl = `https://tokigames-challenge.herokuapp.com/api/flights/${typeStr}`;
        axios.put(apiUrl, data)
            .then((response) => {
                dispatch({
                    type: "ADD_FLIGHTS_FULFILLED",
                    payload: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: "ADD_FLIGHTS_REJECTED",
                    payload: err
                })
            })
    }
}