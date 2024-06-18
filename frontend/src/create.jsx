import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



 function Create()
{
    const[name, setName] = useState('');
    const[city, setCity] = useState('');
    const[street, setStreet] = useState('');
    const[primaryContactNumber, setPrimaryContactNumber] = useState('');
    const[secondaryContactNumber, setSecondaryContactNumber] = useState('');
    const[postalCode, setPostalCode] = useState('');
    const Navigate = useNavigate();
    

    const Submit = async(e)=>{
        e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3000/add-person",{
            name,
            address: { city, street },
            phone: { primaryContactNumber, secondaryContactNumber },
            postalCode    
        })
        console.log(response);
        alert('Contact Added Successfully');
        Navigate('/');
        }
        catch(error){
            console.log(error);
            alert('Error adding contact '.error);
            
        }
    }
    return(
        <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-header">
            <h2 className="card-title mb-0">Contact Form</h2>
            <Link to="/" className="btn btn-danger float-end">Back</Link>
          </div>
          <div className="card-body">
            <form onSubmit={Submit}>
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}  />
              </div>
              <div className="form-group mb-3">
                <label>Address</label>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city"
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}} />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" id="street"
                    value={street}
                    onChange={(e)=>{setStreet(e.target.value)}}/>
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
                    onChange={(e)=>{setPrimaryContactNumber(e.target.value)}}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="secondaryContact">Secondary Contact Number</label>
                    <input type="text" className="form-control" id="secondaryContact" 
                    value={secondaryContactNumber}
                    onChange={(e)=>{setSecondaryContactNumber(e.target.value)}} />
                  </div>
                  <div className="form-group mb-3">
                <label htmlFor="name">Postal Code</label>
                <input type="text" className="form-control" id="postalcode"
                value={postalCode}
                onChange={(e)=>{setPostalCode(e.target.value)}}/>
              </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default Create