import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Assuming you have imported Firebase Auth module as 'auth'
import { collection, getDocs, query, where, Timestamp, addDoc } from "firebase/firestore";
import './quarterlist.css';
import { useUser } from "../UserContext";

const QuarterList = () => {
  const [buildingList, setBuildingList] = useState([]);
  const { user } = useUser(); // Assuming useUser() provides the logged-in user details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'building'), where("userId", "in", ["","null"]));
        const dbVal = await getDocs(q);
        setBuildingList(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handleApplyClick = async (building) => {
    if (!user) {
      alert("Please log in to apply.");
      return;
    }

    if (!window.confirm("Are you sure you want to apply?")) {
      return;
    }

    try {
      const applyData = {
        userId: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "", // Assuming user.phone is available
        buildingname: building.buildingname,
        roomno: building.roomno,
        timestamp: Timestamp.now(),
        status: "pending"
      };

      await addDoc(collection(db, "apply"), applyData);
      alert("Applied Successfully");
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className='quarter-list'>
      <h1>Available Quarters</h1>
      <div>
        {buildingList.map(building => (
          <div key={building.id} className='list'>
            <li>{building.buildingname}, {building.roomno}</li>
            <li className='apply-btn' onClick={() => handleApplyClick(building)}>Apply</li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuarterList;
