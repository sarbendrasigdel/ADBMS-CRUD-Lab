import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import axios from 'axios';


 function Contacts()
{
    const[contacts,setContacts] = useState([]);
    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await axios.get('http://localhost:3000/persons');
                setContacts(response.data); 
            } catch (error) {
                console.error('Error fetching persons:', error);
            }
        };

        fetchPersons(); 
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await axios.delete(`http://localhost:3000/person/delete/${id}`);
                alert('Contact Deleted Successfully');
                setContacts(contacts.filter(contact => contact._id !== id));
            } catch (error) {
                console.error('Error deleting contact:', error);
                alert('Error deleting contact');
            }
        }
    };

    return(
        <div className="container mt-5">
        <Link to="/create" className="btn btn-success float-end">+Add Contact</Link>
        <h2>Contacts</h2>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>phone</th>
              {/* <th>Postal Code</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          {contacts.map((contact,index )=> (
                        <tr key={contact._id}>
                            <td>{index+1}</td>
                            <td>{contact.name}</td>
                            <td>{`${contact.address.city}, ${contact.address.street}`}</td>
                            <td>{`${contact.phone.primaryContactNumber}${contact.phone.secondaryContactNumber ? ` / ${contact.phone.secondaryContactNumber}` : ''}`}</td>
                            {/* <td>{contact.postalcode}</td> */}
                            <td>
                                <Link to={`/update/${contact._id}`} className="btn btn-primary">Edit</Link>
                                <button onClick={() => handleDelete(contact._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}

          </tbody>
        </table>
      </div>
    )
}
export default Contacts
