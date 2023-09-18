import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";
import UsernameDisplay from "../username-display/UsernameDisplay";
import { Post } from "../../interfaces/Post";
import "./FetchAllComments.scss";

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

  const fetchComments = async () => {
    try {
      const postDocRef = doc(firestore, "Posts", postId);

      const postDocSnapshot = await getDoc(postDocRef);

      if (postDocSnapshot.exists()) {
        const commentsData = postDocSnapshot.data()?.comments;

        if (commentsData) {
          commentsData.sort(
            (
              a: { commentCreatedAt: { toDate: () => number } },
              b: { commentCreatedAt: { toDate: () => number } }
            ) => b.commentCreatedAt.toDate() - a.commentCreatedAt.toDate()
          );
          setComments(commentsData);
        }
      } else {
        console.log("Dokument posta o podanym postId nie istnieje.");
      }
    } catch (error) {
      console.log("Błąd podczas pobierania danych posta:", error);
    }
  };

  useEffect(() => {
    if (!postId) {
      return;
    }

    // Tworzenie referencji do dokumentu posta
    const postDocRef = doc(firestore, "Posts", postId);

    // Subskrypcja do zmian w polu 'comments' dokumentu posta
    const unsubscribe = onSnapshot(postDocRef, (docSnapshot) => {
      const post = docSnapshot.data() as Post;

      // Sprawdzenie, czy pole 'comments' istnieje i czy nie jest puste
      if (post?.comments?.length > 0) {
        setComments(post.comments);
      } else {
        // Jeśli pole 'comments' nie istnieje lub jest puste, ustaw pustą tablicę komentarzy
        setComments([]);
      }
    });

    fetchComments();

    return () => unsubscribe(); // Zatrzymaj nasłuchiwanie po odmontowaniu komponentu
  }, [postId]);

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comments__comment">
          <UsernameDisplay userId={comment.userId} />

          <div className="comments__comment__content">
            {comment.commentContent}
          </div>
          <div className="comments__comment__createdAt">
            {comment.commentCreatedAt?.toDate().toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchAllComments;
