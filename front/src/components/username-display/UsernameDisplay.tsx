import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";
import "./UsernameDisplay.scss";

interface UsernameDisplayProps {
  userId: string; // Props containing the user's identifier (userId)
}

const UsernameDisplay: React.FC<UsernameDisplayProps> = ({ userId }) => {
  // State to store the username
  const [username, setUsername] = useState(""); // Set an initial value of "Loading..."

  // Effect triggered after component render or when the userId value changes
  useEffect(() => {
    // Function to fetch the username based on the userId
    const fetchUsername = async (userId: string) => {
      console.log("user ID: ", userId);
      // Reference to the "Usernames" collection in the Firestore database
      const usernameCollectionRef = collection(firestore, "Usernames");
      try {
        // Get documents from the "Usernames" collection
        const querySnapshot = await getDocs(usernameCollectionRef);
        // Search for the document with the matching userId
        const usernameData = querySnapshot.docs.find(
          (doc) => doc.data().userId === userId
        );
        // Set the username based on the data from the database
        setUsername(
          usernameData ? usernameData.data().username : "Unknown User"
        );
      } catch (error) {
        console.log("Error fetching username:", error);
        // In case of an error, set the username to "Unknown User"
        setUsername("Unknown User");
      }
    };

    // Call the fetchUsername function whenever the userId value changes
    fetchUsername(userId);
  }, [userId]); // Effect depends on the userId value

  // Display the username
  return <p className="username">{username}</p>;
};

export default UsernameDisplay;
