import React, { useState } from "react";
import axios from "axios";
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useHistory } from "react-router-dom";

export interface IValues {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    address: string,
    description: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

const defaultValues: IValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: ""
}

function AddCustomer<RouteComponentProps>() {
    const [values, setValues] = useState(defaultValues as IValues);
    const history = useHistory();
    
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
        console.log('VALUE~~~~<>>>', values)
    }

    const handleSubmit = (event:any) => {
        event.persist();
        axios.post(`http://localhost:8000/customers`, values).then(data => [
              history.goBack()
          ]);
          console.log('VALUES~~~~~>>>', values)
    }

    // console.log('VALUES~~~~~>>>', values)

    return (
        <div>
            <h2>Add Customer</h2>
            <form style={{ paddingTop: '5%', width: '50%', marginLeft: '20%' }}>
                <MDBRow className='mb-4'>
                    <MDBCol>
                        <MDBInput 
                            id='form6Example1' 
                            label='First name' 
                            name="first_name"
                            value={values.first_name}
                            onChange={handleChange}
                            />
                    </MDBCol>
                    <MDBCol>
                        <MDBInput 
                            id='form6Example2' 
                            label='Last name'
                            name="last_name"
                            value={values.last_name}
                            onChange={handleChange} 
                            />
                    </MDBCol>
                </MDBRow>

                <MDBInput 
                    wrapperClass='mb-4' 
                    type='email' 
                    id='form6Example3' 
                    label='Email' 
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    />
                <MDBInput 
                    wrapperClass='mb-4' 
                    type='tel' 
                    id='form6Example4' 
                    label='Phone' 
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    />
                <MDBInput 
                    wrapperClass='mb-4' 
                    id='form6Example5' 
                    label='Address' 
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    />
                <MDBInput 
                    wrapperClass='mb-4' 
                    id='form6Example6' 
                    label='Description'
                    name="description"
                    value={values.description} 
                    onChange={handleChange}
                    />

                {/* <MDBCheckbox
                    wrapperClass='d-flex justify-content-center mb-4'
                    id='form6Example8'
                    label='Create an account?'
                    defaultChecked
                /> */}
                <div>
                <MDBBtn  className='mx-2' type="submit" onSubmit={handleSubmit}>Button</MDBBtn>
                <MDBBtn className='mx-2' color='info'> Back </MDBBtn>
                </div>
            </form>
        </div>
    )
}

export default AddCustomer;