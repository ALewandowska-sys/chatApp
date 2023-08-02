import React, { useState } from "react";
import { collection, addDoc, Timestamp, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

interface Comment {
  userId: string;
  postId: string;
  commentContent: string;
  commentCreatedAt: Date;
}

interface AddCommentProps {
  postId: string;
  userId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, userId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [user] = useAuthState(auth);

  // Function to handle changes in the comment text area
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  // Function to handle adding a new comment
  const handleAddComment = async () => {
    // Check if the comment content is empty
    if (!commentContent) {
      alert("Please write your comment before adding");
      return;
    }

    // Check if the user is logged in
    if (!user) {
      alert("Please log in to add a comment");
      return;
    }

    // Reference to the 'Comments' collection in Firestore
    const commentsCollectionRef = collection(firestore, "Comments");
    
    // New comment object to be added to Firestore
    const newComment: Comment = {
      userId: userId,
      postId: postId,
      commentContent,
      commentCreatedAt: Timestamp.now().toDate(),
    };

    try {
      // Add the new comment to the 'Comments' collection
      const docRef = await addDoc(commentsCollectionRef, newComment);
      setCommentContent("");
      console.log("Comment added successfully!");

      // Update the 'comments' array in the corresponding post's document in the 'Posts' collection
      const postCollectionRef = collection(firestore, "Posts");
      const postDocRef = doc(firestore, "Posts", postId);
      await updateDoc(postDocRef, {
        comments: arrayUnion(docRef.id), // Add the new comment id to the comments array
      });
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <div>
      {/* Text area to write the comment */}
      <textarea
        placeholder="Write your comment here"
        rows={3}
        defaultValue={commentContent} 
        onChange={handleCommentChange} // Add the onChange event handler
      ></textarea>
      {/* Button to add the comment */}
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default AddComment;
