// UsernameDisplay.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";

interface UsernameDisplayProps {
  userId: string;
}

const UsernameDisplay: React.FC<UsernameDisplayProps> = ({ userId }) => {
  const [username, setUsername] = useState("Loading...");

  useEffect(() => {
    const fetchUsername = async (userId: string) => {
      const usernameCollectionRef = collection(firestore, "Usernames");
      try {
        const querySnapshot = await getDocs(usernameCollectionRef);
        const usernameData = querySnapshot.docs.find(
          (doc) => doc.data().userId === userId
        );
        setUsername(usernameData ? usernameData.data().username : "Unknown User");
      } catch (error) {
        console.log("Error fetching username:", error);
        setUsername("Unknown User");
      }
    };

    fetchUsername(userId);
  }, [userId]);

  return <p>Username: {username}</p>;
};

export default UsernameDisplay;
