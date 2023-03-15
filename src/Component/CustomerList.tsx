import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useHistory } from "react-router-dom";

const CustomerList = () => {
    const [data, setData] = useState([] as any[])
    const history = useHistory();
    
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const customers = await axios.get(`http://localhost:8000/customers`);
        setData(customers.data);
        console.log(customers)
    }

    const handleDelete = (id:number) => {
        let url = `http://localhost:8000/customers/${id}`

        axios.delete(url).then(res => {
            const del = data.filter(data => id !== data.id)
            setData(del)
            console.log('res', res)
        })
    }

    return (
        <div>
            <h2>CUSTOMER LIST</h2>
            <div style={{marginLeft:'40%'}}>
            <MDBBtn className='mx-2' color='info' onClick={() => history.push('/addCustomer')}>
                New +
            </MDBBtn>
            </div>
            <MDBTable striped style={{width:'60%', marginLeft:'15%', marginTop:'5%'}}>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>First Name</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Phone</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data.map((value) => {
                        return (
                            <tr>
                            <th scope='row'>{value.id}</th>
                            <td>{value.first_name}</td>
                            <td>{value.last_name}</td>
                            <td>{value.email}</td>
                            <td>{value.phone}</td>
                            <td>{value.address}</td>
                            <td>{value.description}</td>
                            <td>
                            <MDBBtn color='primary' tag='a' floating onClick={() => history.push(`editCustomer/${value.id}`)}>
                                <MDBIcon fas icon='pen' />
                            </MDBBtn>{" "}
                            <MDBBtn color='danger' tag='a' floating onClick={() => handleDelete(value.id)}>
                                <MDBIcon fas icon='trash' />
                            </MDBBtn>
                            </td>
                        </tr>    
                        )
                    })}
                </MDBTableBody>
            </MDBTable>
        </div>
    )
}

export default CustomerList;