import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";
import UsernameDisplay from "../username-display/UsernameDisplay";

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

  useEffect(() => {
    if (!postId) {
      return; // Do not execute the fetch if postId is undefined
    }

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
      const updatedComments: Comment[] = [];
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          updatedComments.push({ id: change.doc.id, ...change.doc.data() } as Comment);
        }
      });
      setComments((prevComments) => [...prevComments, ...updatedComments]);
    });

    fetchComments();

    return () => unsubscribe();
  }, [postId, commentsCollectionRef]);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <UsernameDisplay userId={comment.userId} />
          <p>Comment: {comment.commentContent}</p>
          <p>CommentCreatedAt: {comment.commentCreatedAt?.toDate().toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchAllComments;
