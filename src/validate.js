const validate = values => {
    const errors = {}
    if (!values.route) {
      errors.route = 'Required'
    }
    if (!values.flightType) {
        errors.flightType = 'Required'
    }
    if (!values.departure) {
        errors.departure = 'Required'
    }
    if (!values.arrival) {
        errors.arrival = 'Required'
    }
    return errors
  }
  
  export default validate