export default function reducer(
	state = {
		flights: {},
		fetching: false,
		fetched: false,
		error: null,
	}, action) {

	switch (action.type) {
		case "GET_FLIGHTS": {
			return { ...state, fetching: true }
		}
		case "GET_FLIGHTS_REJECTED": {
			return { ...state, fetching: false, error: action.payload }
		}
		case "GET_FLIGHTS_FULFILLED": {
			return {
				...state,
				fetching: false,
				fetched: true,
				flights: action.payload,
			}
		}
		case "CLEAR_FLIGHTS": {
			return {
				...state,
				fetching: false,
				fetched: false,
				error: null,
				flights: {}
			}
		}
		default: {
			return state;
		}
	}
}