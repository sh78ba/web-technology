import React, { useEffect, useState } from "react";
import "./MyQuarters.css"; // Import your CSS file
import { useUser } from "../UserContext";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";

const MyQuarters = () => {
  const [occupiedQuarter, setOccupiedQuarter] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const { user } = useUser();

  useEffect(() => {
    const fetchOccupiedQuarter = async () => {
      try {
        const q = query(collection(db, 'building'), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const occupiedBuilding = querySnapshot.docs[0].data();
          setOccupiedQuarter(occupiedBuilding);
        }
        setLoading(false); // Set loading to false after data fetching
      } catch (error) {
        console.error("Error fetching occupied quarter:", error);
        setLoading(false); // Set loading to false even in case of error
      }
    };

    if (user) {
      fetchOccupiedQuarter();
    }
  }, [user]); // Include user in dependency array

  if (!user) {
    return <div>Loading...</div>; // Handle loading state if user is not available
  }

  const { name, email } = user;

  return (
    <div className="my-quarters-container">
      {loading ? ( // Conditional rendering based on loading state
        <div>Loading...</div>
      ) : (
        <div className="quarters-content">
          <div className="user-info">
            <h2 className="info-label">Name:</h2>
            <p className="info-value">{name}</p>
          </div>
          <div className="email-info">
            <h2 className="info-label">Email:</h2>
            <p className="info-value">{email}</p>
          </div>
          <div className="occupied-info">
            <h2 className="info-label">Occupied Quarter:</h2>
            <p className="info-value">{occupiedQuarter ? `${occupiedQuarter.buildingname}, ${occupiedQuarter.roomno}` : "None"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuarters;
