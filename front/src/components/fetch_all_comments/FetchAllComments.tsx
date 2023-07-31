// FetchAllComments.tsx

import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

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

    const unsubscribe = onSnapshot(query(commentsCollectionRef, where("postId", "==", postId)), (snapshot) => {
      const updatedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(updatedComments);
    });

    fetchComments();

    return () => unsubscribe();
  }, [postId, commentsCollectionRef]); // Add commentsCollectionRef to the dependency array

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>CommentContent: {comment.commentContent}</p>
          <p>CommentCreatedAt: {comment.commentCreatedAt.toDate().toLocaleString()}</p>
          {/* Fetch username using comment.userId */}
          {/* You can create a new component for this */}
        </div>
      ))}
    </div>
  );
};

export default FetchAllComments;
