import axios from "axios";

const flightType = {
    CHEAP: 'cheap',
    BUSINESS: 'business'
}

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

export function clearFlights(typeStr) {
    return function (dispatch) {
        dispatch({
            type: "CLEAR_FLIGHTS"
        });
    }
}

export function deleteFlights(typeStr, dataList) {
    return function (dispatch) {
        dispatch({
            type: "DELETE_FLIGHTS"
        });

        let data = null;
        if (typeStr === flightType.CHEAP) {
            data = dataList.map((item) => {
                const spAry = item.split(';');
                return {
                    route: spAry[0],
                    departure: spAry[1],
                    arrival: spAry[2]
                }
            });
        } else if (typeStr === flightType.BUSINESS) {
            data = dataList.map((item) => {
                const spAry = item.split(';');
                return {
                    departure: spAry[0],
                    arrival: spAry[1],
                    departureTime: spAry[2],
                    arrivalTime: spAry[3]
                }
            });
        }
        console.log(data);

        // I don't think method 'DELETE' is available for this API. Propably it's the CORS issue.

        /*
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
        */
    }
}


export function addFlights(dataObj) {
    return async function (dispatch) {
        dispatch({
            type: "ADD_FLIGHTS"
        });

        let rst = null;

        if (dataObj.flightType === flightType.CHEAP) {
            rst = {
                route: dataObj.route,
                arrival: dataObj.arrival,
                departure: dataObj.departure
            }
        } else if (dataObj.flightType === flightType.BUSINESS) {
            rst = {
                arrival: dataObj.arrivalBiz,
                departure: dataObj.departureBiz,
                arrivalTime: dataObj.arrivalTime,
                departureTime: dataObj.departureTime
            }
        }

        console.log("ADD_FLIGHTS:",rst, dataObj);

        // I don't think method 'PUT' or 'POST' is available for this API. Propably it's the CORS issue.

        /*
        const apiUrl = `https://tokigames-challenge.herokuapp.com/api/flights/${dataObj.flightType}`;
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
        */
    }
}