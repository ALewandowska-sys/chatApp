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

  const handleAddComment = async () => {
    if (!commentContent) {
      alert("Comment cannot be empty");
      return;
    }

    if (!user) {
      alert("Please log in to add a comment");
      return;
    }

    const commentsCollectionRef = collection(firestore, "Comments");
    const newComment: Comment = {
      userId: userId,
      postId: postId,
      commentContent,
      commentCreatedAt: Timestamp.now().toDate(),
    };

    try {
      const docRef = await addDoc(commentsCollectionRef, newComment);
      setCommentContent("");
      console.log("Comment added successfully!");

      // Add comment id to Posts collection
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
      <textarea
        placeholder="Napisz swój komentarz tutaj"
        rows={3}
        value={commentContent}
      ></textarea>
      <button onClick={handleAddComment}>Dodaj</button>
    </div>
  );
};

export default AddComment;
