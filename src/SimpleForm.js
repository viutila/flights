import React from 'react';
import { Field, reduxForm } from 'redux-form';


const style = {
    div01: {
        display: 'flex',
        marginTop: '10px'
    },
    label01: {
        minWidth: '120px'
    },
    div02: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
    }
}

const initialValues = {
    flightType: 'cheap',
    route: '',
    departure: '2019-06-01T02:12',
    arrival: '2019-06-02T03:12',

    departureBiz: '',
    arrivalBiz: '',
    departureTime: '2019-06-01T02:12',
    arrivalTime: '2019-06-02T03:12',
}


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

    if (!values.departureBiz) {
        errors.departureBiz = 'Required'
    }
    if (!values.arrivalBiz) {
        errors.arrivalBiz = 'Required'
    }
    if (!values.departureTime) {
        errors.departureTime = 'Required'
    }
    if (!values.arrivalTime) {
        errors.arrivalTime = 'Required'
    }
    
    return errors
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div style={style.div01}>
            <label style={style.label01}>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched &&
                    ((error && <span style={{ color: 'red', fontWeight: 'bold' }}>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

const SimpleForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props;

    const [flightType, setflightType] = React.useState('cheap');

    const handleChangeFlightType = event => {
        console.log(event.target.value);
        setflightType(event.target.value);
    };

    function item() {
        let rst = []
        switch (flightType) {
            case 'cheap': {
                rst.push(
                    <Field
                        name="route"
                        component={renderField}
                        type="text"
                        placeholder="Route"
                        label="Route"
                        key="Route"
                    />,

                    <Field
                        name="departure"
                        component={renderField}
                        type="datetime-local"
                        placeholder="Departure"
                        label="Departure"
                        key="Departure"
                    />,

                    <Field
                        name="arrival"
                        component={renderField}
                        type="datetime-local"
                        placeholder="Arrival"
                        label="Arrival"
                        key="Arrival"
                    />
                );
                break;
            }
            case 'business': {
                rst.push(
                    <Field
                        name="departureBiz"
                        component={renderField}
                        type="text"
                        placeholder="Departure"
                        label="Departure"
                        key="Departure"
                    />,
                    <Field
                        name="arrivalBiz"
                        component={renderField}
                        type="text"
                        placeholder="Arrival"
                        label="Arrival"
                        key="Arrival"
                    />,

                    <Field
                        name="departureTime"
                        component={renderField}
                        type="datetime-local"
                        placeholder="Departure Time"
                        label="Departure Time"
                        key="Departure Time"
                    />,

                    <Field
                        name="arrivalTime"
                        component={renderField}
                        type="datetime-local"
                        placeholder="Arrival Time"
                        label="Arrival Time"
                        key="Arrival Time"
                    />
                );
                break;
            }
            default:
                break;
        }
        return rst;
    }

    return (
        <div style={style.div02}>
            <form onSubmit={handleSubmit}>

                <div style={style.div01}>
                    <label style={style.label01}>Flight Type</label>
                    <div>
                        <Field name="flightType" component="select" onChange={(event) => { handleChangeFlightType(event) }}>
                            <option value="cheap">Cheap</option>
                            <option value="business">Business</option>
                        </Field>
                    </div>
                </div>

                {item()}

                <div style={style.div02}>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
                </div>

            </form>
        </div>

    );
};

export default reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate,
    initialValues
})(SimpleForm);
