
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Request.css';

const Requests = ({ requestType }) => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = collection(db, 'request');
        const dbVal = await getDocs(value);
        const requestsData = dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        let filteredRequests = requestsData;
        if (requestType) {
          filteredRequests = requestsData.filter(request => request.requestType === requestType);
        }
        
        setRequests(filteredRequests);

        // Initialize status object with status from database for each request
        const initialStatus = {};
        filteredRequests.forEach(request => {
          initialStatus[request.id] = request.status;
        });
        setStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, [requestType]); // Fetch data whenever the requestType prop changes

  // Function to handle status change
  const handleStatusChange = async (e, requestId) => {
    const newStatus = e.target.value;
    setStatus(prevStatus => ({
      ...prevStatus,
      [requestId]: newStatus
    }));
    try {
      // Update the status in Firestore
      await updateDoc(doc(db, 'request', requestId), { status: newStatus });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div>
      <div className="container-list">
        <h2>{requestType ? requestType : "All Requests"}</h2>
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Quarter Name</th>
              <th>Quarter No</th>
              <th>Request Type</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td>{request.userId}</td>
                <td>{request.name}</td>
                <td>{request.phone}</td>
                <td>{request.email}</td>
                <td>{request.buildingName}</td>
                <td>{request.roomNo}</td>
                <td>{request.requestType}</td>
                <td>{request.message}</td>
                <td>
                  <select value={status[request.id]} onChange={(e) => handleStatusChange(e, request.id)}>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
