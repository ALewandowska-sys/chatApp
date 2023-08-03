import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

interface Reaction {
  id: number;
  name: string;
}

interface AddReactionProps {
  postId: string;
}

const AddReaction: React.FC<AddReactionProps> = ({ postId }) => {
  const reactions: Reaction[] = [
    { id: 1, name: "Like" },
    { id: 2, name: "Dislike" },
    { id: 3, name: "Haha" },
    { id: 4, name: "Heart" },
    { id: 5, name: "Angry" },
  ];

  const [selectedReaction, setSelectedReaction] = useState<number | null>(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUserReaction = async () => {
      if (user) {
        const postDocRef = doc(firestore, "Posts", postId);
        const postDocSnap = await getDoc(postDocRef);

        if (postDocSnap.exists()) {
          const postData = postDocSnap.data();
          const userReaction = postData?.reactions?.find((reaction: any) => reaction.userId === user.uid);
          setSelectedReaction(userReaction?.reactionId || null);
        }
      }
    };

    fetchUserReaction();
  }, [user, postId]);

  const handleReactionClick = async (reactionId: number) => {
    if (!user) {
      alert("Please log in to add a reaction");
      return;
    }

    const postDocRef = doc(firestore, "Posts", postId);

    try {
      // Fetch the current reactions array from the document
      const postDocSnap = await getDoc(postDocRef);
      const postData = postDocSnap.data();
      const currentReactions = postData?.reactions || [];

      // Find the user's current reaction in the array (if exists)
      const userReactionIndex = currentReactions.findIndex((reaction: any) => reaction.userId === user.uid);

      if (userReactionIndex === -1) {
        // If the user has not reacted yet, add the new reaction to the array
        currentReactions.push({ reactionId, userId: user.uid });
      } else {
        // If the user has already reacted, update their reaction in the array
        currentReactions[userReactionIndex].reactionId = reactionId;
      }

      // Update the 'reactions' array in the post's document in the 'Posts' collection
      await setDoc(postDocRef, { reactions: currentReactions });
      setSelectedReaction(reactionId); // Update the selected reaction in the local state
      console.log("Reaction added successfully!");
    } catch (error) {
      console.log("Error adding reaction:", error);
    }
  };

  return (
    <div>
      {reactions.map((reaction) => (
        <button
          key={reaction.id}
          onClick={() => handleReactionClick(reaction.id)}
          style={{
            backgroundColor: selectedReaction === reaction.id ? "green" : "transparent",
          }}
        >
          {reaction.name}
        </button>
      ))}
    </div>
  );
};

export default AddReaction;
