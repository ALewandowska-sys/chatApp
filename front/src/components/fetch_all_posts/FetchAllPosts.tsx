import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import "./FetchAllPosts.scss";
import AddComment from "../add_comment/AddComment";
import { useAuthState } from "react-firebase-hooks/auth";
import UsernameDisplay from "../username-display/UsernameDisplay";
import FetchAllComments from "../fetch_all_comments/FetchAllComments";
import AddReaction from "../add_reaction/AddReaction";

interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: any;
  comments?: string[]; // Update the comments and reactions type to string[]
  reactions?: string[];
}

export default function FetchAllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user] = useAuthState(auth);
  const [showComments, setShowComments] = useState<boolean>(false);

  // Fetch all posts from Firestore
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

  // Subscribe to changes in the 'Posts' collection in Firestore
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

  // Function to handle toggling comments visibility
  const handleToggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };



  return (
    <div className="fetch-all-posts__container">
      {posts.map((post) => (
        <div key={post.id} className="fetch-all-posts___container___post">
          <UsernameDisplay userId={post.userId} />
          <p>Content: {post.content}</p>
          <p>CreatedAt: {post.createdAt?.toDate().toLocaleString()}</p>
          <p onClick={handleToggleComments} style={{ cursor: "pointer", color: "blue" }}>
Comments: {post.comments ? post.comments.length : 0}
</p>
          <p>Reactions: {post.reactions ? post.reactions.length : 0}</p>
          <AddReaction postId={post.id}/>
          <AddComment postId={post.id} userId={post.userId} />
          {showComments && <FetchAllComments postId={post.id} />}
        </div>
      ))}
    </div>
  );
}




