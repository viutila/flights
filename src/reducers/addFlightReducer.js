export default function reducer(
	state = {
		addFlights: {},
		fetching: false,
		fetched: false,
		error: null,
	}, action) {

	switch (action.type) {
		case "ADD_FLIGHTS": {
			return { ...state, fetching: true }
		}
		case "ADD_FLIGHTS_REJECTED": {
			return { ...state, fetching: false, error: action.payload }
		}
		case "ADD_FLIGHTS_FULFILLED": {
			return {
				...state,
				fetching: false,
				fetched: true,
				addFlights: action.payload,
			}
		}
		case "CLEAR_ADD_FLIGHTS": {
			return {
				...state,
				fetching: false,
				fetched: false,
				error: null,
				addFlights: {}
			}
		}
		default: {
			return state;
		}
	}
}