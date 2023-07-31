import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import "./FetchAllPosts.scss";
import AddComment from "../add_comment/AddComment";
import { useAuthState } from "react-firebase-hooks/auth";
import UsernameDisplay from "../username-display/UsernameDisplay";
import FetchAllComments from "../fetch_all_comments/FetchAllComments"; // Import the FetchAllComments component

interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: any;
  comments: any[];
  reactions: any[];
}

export default function FetchAllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user] = useAuthState(auth);
  const [showComments, setShowComments] = useState<boolean>(false); // New state to track if comments should be shown

  const fetchPosts = async () => {
    const postCollectionRef = collection(firestore, "Posts");
    try {
      const querySnapshot = await getDocs(postCollectionRef);
      const fetchedPosts = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const post = doc.data() as Post;
          return {
            ...post,
            id: doc.id,
          };
        })
      );
      setPosts(fetchedPosts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    const postCollectionRef = collection(firestore, "Posts");
    const unsubscribe = onSnapshot(postCollectionRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          const doc = change.doc;
          const post = doc.data() as Post;
          setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
              prevPost.id === doc.id ? { ...post, username: "Unknown User" } : prevPost
            )
          );
        }
      });
    });

    fetchPosts();

    return () => unsubscribe();
  }, []);

  const handleToggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments); // Toggle the value of showComments on click
  };

  return (
    <div className="fetch-all-posts__container">
      {posts.map((post) => (
        <div key={post.id} className="fetch-all-posts___container___post">
          <UsernameDisplay userId={post.userId} />
          <p>Content: {post.content}</p>
          <p>CreatedAt: {post.createdAt.toDate().toLocaleString()}</p>
          <p onClick={handleToggleComments} style={{ cursor: "pointer", color: "blue" }}>
            Comments: {post.comments ? post.comments.length : 0}
          </p>
          <p>Reactions: {post.reactions ? post.reactions.length : 0}</p>
          <AddComment postId={post.id} userId={post.userId} />
          {showComments && <FetchAllComments postId={post.id} />} {/* Render FetchAllComments when showComments is true */}
        </div>
      ))}
    </div>
  );
}
