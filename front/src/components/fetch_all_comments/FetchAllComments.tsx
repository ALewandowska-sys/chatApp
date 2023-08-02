// FetchAllComments.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import UsernameDisplay from "../username-display/UsernameDisplay"; // Import the new component
import './FetchAllComments.scss'


interface Comment {
  id: string;
  userId: string;
  postId: string;
  commentContent: string;
  commentCreatedAt: any;
}

interface FetchAllCommentsProps {
  postId: string;
}

const FetchAllComments: React.FC<FetchAllCommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const commentsCollectionRef = collection(firestore, "Comments");
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchComments = async () => {
      const postCommentsQuery = query(commentsCollectionRef, where("postId", "==", postId));

      try {
        const querySnapshot = await getDocs(postCommentsQuery);
        const fetchedComments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Comment[];
        setComments(fetchedComments);
      } catch (error) {
        console.log("Error fetching comments:", error);
      }
    };

    // Function to respond to changes in the comments collection (e.g., when a new comment is added)
    const unsubscribe = onSnapshot(query(commentsCollectionRef, where("postId", "==", postId)), (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(updatedComments);
    });

    fetchComments();

    return () => unsubscribe();
  }, [postId, commentsCollectionRef]); // Update the comments state only when postId or commentsCollectionRef changes

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>CommentContent: {comment.commentContent}</p>
          <p>CommentCreatedAt: {comment.commentCreatedAt.toDate().toLocaleString()}</p>
          <UsernameDisplay userId={comment.userId} />
        </div>
      ))}
    </div>
  );
};

export default FetchAllComments;
