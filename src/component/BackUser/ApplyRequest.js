// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
// import './Request.css'


// const ApplyRequest = ({ requestType }) => {
//   const [requests, setRequests] = useState([]);
//   const [status, setStatus] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const value = collection(db, 'apply');
//         const dbVal = await getDocs(value);
//         const requestsData = dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//         setRequests(requestsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData(); 
//   }, [requestType]); 

//   // Function to handle status change
//   const handleStatusChange = async (e, requestId) => {
//     const newStatus = e.target.value;
//     setStatus(prevStatus => ({
//       ...prevStatus,
//       [requestId]: newStatus
//     }));
//     try {
//       // Update the status in Firestore
//       await updateDoc(doc(db, 'apply', requestId), { status: newStatus });
//     } catch (error) {
//       console.error("Error updating document:", error);
//     }
//   };

//   return (
//     <div>
//       <div className="container-list">
//         <h2>Apply Request</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Requested Quarter Name</th>
//               <th>Requested Quarter No</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map(request => (
//               <tr key={request.id}>
//                 <td>{request.name}</td>
//                 <td>{request.phone}</td>
//                 <td>{request.email}</td>
//                 <td>{request.buildingname}</td>
//                 <td>{request.roomno}</td>
//                 <td>
//                   <select value={status[request.id]} onChange={(e) => handleStatusChange(e, request.id)}>
//                     <option value="Pending">Pending</option>
//                     <option value="Done">Done</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ApplyRequest;

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Request.css'

const ApplyRequest = ({ requestType }) => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = collection(db, 'apply');
        const dbVal = await getDocs(value);
        const requestsData = dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        // Sort requests by timestamp (assuming timestamp field name is 'timestamp')
        requestsData.sort((a, b) => b.timestamp - a.timestamp); // Sort in descending order
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, [requestType]); 

  // Function to handle status change
  const handleStatusChange = async (e, requestId) => {
    const newStatus = e.target.value;
    setStatus(prevStatus => ({
      ...prevStatus,
      [requestId]: newStatus
    }));
    try {
      // Update the status in Firestore
      await updateDoc(doc(db, 'apply', requestId), { status: newStatus });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div>
      <div className="container-list">
        <h2>Apply Request</h2>
        <table>
          <thead>
            <tr>
              <th>UserID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Requested Quarter Name</th>
              <th>Requested Quarter No</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td>{request.userId}</td>
                <td>{request.name}</td>
                <td>{request.phone}</td>
                <td>{request.email}</td>
                <td>{request.buildingname}</td>
                <td>{request.roomno}</td>
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

export default ApplyRequest;
