import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import "./FetchAllPosts.scss";
import AddComment from "../add_comment/AddComment";
import { useAuthState } from "react-firebase-hooks/auth";
import UsernameDisplay from "../username-display/UsernameDisplay";
import FetchAllComments from "../fetch_all_comments/FetchAllComments";

interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: any;
  comments?: string[];
  reactions?: string[];
}

export default function FetchAllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user] = useAuthState(auth);
  const [showComments, setShowComments] = useState<string | null>(null);

  // Fetch all posts from Firestore
  const fetchPosts = async () => {
    const postCollectionRef = collection(firestore, "Posts");
    try {
      const querySnapshot = await getDocs(postCollectionRef);
      const fetchedPosts = querySnapshot.docs.map((doc) => {
        const post = doc.data() as Post;
        return {
          ...post,
          id: doc.id,
        };
      });
      // Sort posts by 'createdAt' in descending order (newest first)
      fetchedPosts.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setPosts(fetchedPosts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  // Function to handle toggling comments visibility for a specific post
  const handleToggleComments = (postId: string) => {
    setShowComments((prevShowComments) =>
      prevShowComments === postId ? null : postId
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="fetch-all-posts__container">
      {posts.map((post) => (
        <div key={post.id} className="fetch-all-posts___container___post">
          <UsernameDisplay userId={post.userId} />
          <p>Content: {post.content}</p>
          <p>CreatedAt: {post.createdAt.toDate().toLocaleString()}</p>
          <p
            onClick={() => handleToggleComments(post.id)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Comments: {post.comments ? post.comments.length : 0}
          </p>
          <p>Reactions: {post.reactions ? post.reactions.length : 0}</p>
          <AddComment postId={post.id} userId={post.userId} />
          {showComments === post.id && <FetchAllComments postId={post.id} />}
        </div>
      ))}
    </div>
  );
}
