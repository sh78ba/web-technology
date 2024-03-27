
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './UpdateRoom.css';

const UpdateRoom = ({ requestType }) => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [newUserId, setNewUserId] = useState('');
  const [searchBuildingName, setSearchBuildingName] = useState('');
  const [searchRoomNo, setSearchRoomNo] = useState('');

  const fetchData = async () => {
    try {
      const value = collection(db, 'building');
      const dbVal = await getDocs(value);
      const requestsData = dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      let filteredRequests = requestsData;
      if (requestType) {
        filteredRequests = requestsData.filter(request => request.requestType === requestType);
      }
      if (searchBuildingName !== '') {
        filteredRequests = filteredRequests.filter(request =>
          request.buildingname.toLowerCase().includes(searchBuildingName.toLowerCase())
        );
      }
      if (searchRoomNo !== '') {
        filteredRequests = filteredRequests.filter(request =>
          request.roomno.toLowerCase().includes(searchRoomNo.toLowerCase())
        );
      }
      
      setRequests(filteredRequests);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestType, searchBuildingName, searchRoomNo]); // Trigger the effect whenever relevant state changes

  const handleUpdateUserId = (id) => {
    setSelectedBuildingId(id);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      const buildingRef = doc(db, 'building', selectedBuildingId);
      await updateDoc(buildingRef, { userId: newUserId });
      setShowModal(false);
      setNewUserId('');
      fetchData();
    } catch (error) {
      console.error('Error updating user ID:', error);
    }
  };

  return (
    <div className="update-room-container">
      <h2>Building Information</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search by Building Name" 
          value={searchBuildingName} 
          onChange={(e) => setSearchBuildingName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Search by Room No" 
          value={searchRoomNo} 
          onChange={(e) => setSearchRoomNo(e.target.value)} 
        />
      </div>
      <ul className="building-info-list">
        {requests.map(request => (
          <li key={request.id} className="building-info-item">
            <strong>Building Name:</strong> {request.buildingname}<br />
            <strong>Room No:</strong> {request.roomno}<br />
            <strong>User ID:</strong> {request.userId}<br />
            <button className="update-button" onClick={() => handleUpdateUserId(request.id)}>
              Update User ID
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h3>Enter New User ID</h3>
            <input type="text" value={newUserId} onChange={(e) => setNewUserId(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateRoom;

