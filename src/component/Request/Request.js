

// import React, { useState, useEffect } from 'react';
// import './request.css';
// import { addDoc, collection, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
// import { db } from '../firebase'; // Assuming db is imported from firebase for Firestore
// import { useUser } from "../UserContext";

// const Request = () => {
//   const { user } = useUser(); // Assuming useUser() provides the logged-in user details

//   const [buildingData, setBuildingData] = useState({
//     buildingName: "",
//     roomNo: ""
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     requestType: "",
//     message: ""
//   });

//   useEffect(() => {
//     if (user && user.uid) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || ""
//       });
      
//       const fetchBuildingDetails = async () => {
//         const buildingQuery = query(collection(db, 'building'), where('userId', '==', user.uid));
//         const querySnapshot = await getDocs(buildingQuery);
//         querySnapshot.forEach(doc => {
//           const buildingInfo = doc.data();
//           setBuildingData({
//             buildingName: buildingInfo.buildingname || "",
//             roomNo: buildingInfo.roomno || ""
//           });
//         });
//       };
//       fetchBuildingDetails();
//     }
//   }, [user]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Validate form data
//     const isValid = validateFormData(formData);
//     if (!isValid) {
//       alert("Please fill out all fields.");
//       return;
//     }
//     try {
//       const dataWithStatus = { ...formData, ...buildingData, status: 'pending', userId: user.uid, timestamp: serverTimestamp() };
//       const docRef = await addDoc(collection(db, "request"), dataWithStatus);
//       alert("Applied Successfully");
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         requestType: "",
//         message: ""
//       });
//     } catch (error) {
//       alert("An error occurred: " + error.message);
//     }
//   };
  
//   // Function to validate form data
//   const validateFormData = (formData) => {
//     for (const key in formData) {
//       if (formData.hasOwnProperty(key) && (formData[key].trim() === "" || (key === "requestType" && formData[key] === ""))) {
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name</label>
//           <input type='text' id='name' name='name' value={formData.name} readOnly />
//         </div>
//         <div>
//           <label htmlFor="email">Email</label>
//           <input type='text' id='email' name='email' value={formData.email} readOnly />
//         </div>
//         <div>
//           <label htmlFor="phone">Phone</label>
//           <input type='text' id='phone' name='phone' value={formData.phone} readOnly />
//         </div>
//         <div>
//           <label htmlFor="buildingName">Building Name</label>
//           <input type='text' id='buildingName' name='buildingName' value={buildingData.buildingName} readOnly />
//         </div>
//         <div>
//           <label htmlFor="roomNo">Room No</label>
//           <input type='text' id='roomNo' name='roomNo' value={buildingData.roomNo} readOnly />
//         </div>
//         <div>
//           <label htmlFor="requestType">Request Type</label>
//           <select id='requestType' name='requestType' value={formData.requestType} onChange={handleChange}>
//             <option value=''>Select</option>
//             <option value='electrician'>Electrician</option>
//             <option value='plumber'>Plumber</option>
//             <option value='others'>Others</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="message">Message</label>
//           <input type='text' id='message' name='message' value={formData.message} onChange={handleChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Request;

import React, { useState, useEffect } from 'react';
import './request.css';
import { addDoc, collection, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming db is imported from firebase for Firestore
import { useUser } from "../UserContext";

const Request = () => {
  const { user } = useUser(); // Assuming useUser() provides the logged-in user details

  const [buildingData, setBuildingData] = useState({
    buildingName: "",
    roomNo: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requestType: "",
    message: ""
  });

  useEffect(() => {
    if (user && user.uid) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
      
      const fetchBuildingDetails = async () => {
        const buildingQuery = query(collection(db, 'building'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(buildingQuery);
        querySnapshot.forEach(doc => {
          const buildingInfo = doc.data();
          setBuildingData({
            buildingName: buildingInfo.buildingname || "",
            roomNo: buildingInfo.roomno || ""
          });
        });
      };
      fetchBuildingDetails();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validate form data
    const isValid = validateFormData(formData);
    if (!isValid) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const dataWithStatus = { ...formData, ...buildingData, status: 'pending', userId: user.uid, timestamp: serverTimestamp() };
      await addDoc(collection(db, "request"), dataWithStatus); // Removed docRef as it was unused
      alert("Applied Successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        requestType: "",
        message: ""
      });
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };
  
  // Function to validate form data
  const validateFormData = (formData) => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && (formData[key].trim() === "" || (key === "requestType" && formData[key] === ""))) {
        return false;
      }
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type='text' id='name' name='name' value={formData.name} readOnly />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type='text' id='email' name='email' value={formData.email} readOnly />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type='text' id='phone' name='phone' value={formData.phone} readOnly />
        </div>
        <div>
          <label htmlFor="buildingName">Building Name</label>
          <input type='text' id='buildingName' name='buildingName' value={buildingData.buildingName} readOnly />
        </div>
        <div>
          <label htmlFor="roomNo">Room No</label>
          <input type='text' id='roomNo' name='roomNo' value={buildingData.roomNo} readOnly />
        </div>
        <div>
          <label htmlFor="requestType">Request Type</label>
          <select id='requestType' name='requestType' value={formData.requestType} onChange={handleChange}>
            <option value=''>Select</option>
            <option value='electrician'>Electrician</option>
            <option value='plumber'>Plumber</option>
            <option value='others'>Others</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <input type='text' id='message' name='message' value={formData.message} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Request;
