import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';
import {  withRouter, useHistory, useParams } from 'react-router-dom';


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
const values: IValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    description: ""
}
function EditCustomer<RouteComponentProps>() {
    const [values, setValues] = useState({} as IValues);
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const customer = await axios.get(`http://localhost:8000/customers/${id}`)
        await setValues(customer.data);
        console.log(values)
    }

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event:any) => {
        event.persist();
        axios.patch(`http://localhost:8000/customers/${id}`, values).then(data => {
              history.goBack()
    });
    }

    return ( 
        <div>
            <h2>Edit Customer</h2>
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

                <MDBBtn className='mb-4' type='submit' block onClick={handleSubmit}>
                    Submit
                </MDBBtn>
                <MDBBtn className='mb-4' type='submit' block onClick={() => history.push('/')}>
                    back
                </MDBBtn>
            </form>
        </div>
    )
}

export default withRouter(EditCustomer);