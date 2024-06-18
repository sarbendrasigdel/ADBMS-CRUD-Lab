import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
// import { useParams } from "react-router-dom";
 function Update()
{
    const {id} = useParams()
    const[name, setName] = useState('');
    const[city, setCity] = useState('');
    const[street, setStreet] = useState('');
    const[primaryContactNumber, setPrimaryContactNumber] = useState('');
    const[secondaryContactNumber, setSecondaryContactNumber] = useState('');
    const[postalCode, setPostalCode] = useState('');
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await axios.get('http://localhost:3000/person/'+ id);
                const { name, address, phone, postalcode } = response.data;
                setName(name);
                setCity(address.city);
                setStreet(address.street);
                setPrimaryContactNumber(phone.primaryContactNumber);
                setSecondaryContactNumber(phone.secondaryContactNumber || '');
                setPostalCode(postalcode || '');
                // setContacts(response.data); 
            } catch (error) {
                console.error('Error fetching persons:', error);
            }
        };

        fetchPersons(); 
    }, [id]);

    const Submit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/person/edit/${id}`, {
                name,
                address: { city, street },
                phone: { primaryContactNumber, secondaryContactNumber },
                postalcode: postalCode
            });
            alert('Contact Updated Successfully');
            Navigate('/');
        } catch (error) {
            console.error('Error updating contact:', error);
            alert('Error updating contact');
        }
    };
    
    
    return(
        <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header">
            <h2 className="card-title mb-0"> Update Contact</h2>
            <Link to="/" className="btn btn-danger float-end">Back</Link>
          </div>
          <div className="card-body">
          <form onSubmit={Submit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                placeholder="Name"  />
              </div>
              <div className="form-group mb-3">
                <label>Address</label>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city"
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                    placeholder="City" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" id="street"
                    value={street}
                    onChange={(e)=>{setStreet(e.target.value)}}
                    placeholder="Street" />
                  </div>
                </div>
              </div>
              <div className="form-group mb-3">
                <label>Contact</label>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="primaryContact">Primary Contact Number</label>
                    <input type="text" className="form-control" id="primaryContact"
                    value={primaryContactNumber}
                    onChange={(e)=>{setPrimaryContactNumber(e.target.value)}}
                    placeholder="Primary Contact Number" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="secondaryContact">Secondary Contact Number</label>
                    <input type="text" className="form-control" id="secondaryContact" 
                    value={secondaryContactNumber}
                    onChange={(e)=>{setSecondaryContactNumber(e.target.value)}}
                    placeholder="Secondary Contact Number" />
                  </div>
                  <div className="form-group mb-3">
                <label htmlFor="name">Postal Code</label>
                <input type="text" className="form-control" id="postalcode"
                value={postalCode}
                onChange={(e)=>{setPostalCode(e.target.value)}}
                placeholder="postal code"  />
              </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default Update