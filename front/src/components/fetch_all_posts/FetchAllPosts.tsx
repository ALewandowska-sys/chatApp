import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase.config";

interface Post {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: any; 
  comments: any[];
  reactions: any[];
}

export default function FetchAllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUsername = async (userId: string) => {
      const usernameCollectionRef = collection(firestore, "Usernames");
      try {
        const querySnapshot = await getDocs(usernameCollectionRef);
        const usernameData = querySnapshot.docs.find(
          (doc) => doc.data().userId === userId
        );
        return usernameData ? usernameData.data().username : "Unknown User";
      } catch (error) {
        console.log("Error fetching username:", error);
        return "Unknown User";
      }
    };

    const fetchPosts = async () => {
      const postCollectionRef = collection(firestore, "Posts");
      try {
        const querySnapshot = await getDocs(postCollectionRef);
        const fetchedPosts = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const post = doc.data() as Post;
            const username = await fetchUsername(post.userId);
            return {
              ...post,
              id: doc.id,
              username,
            };
          })
        );
        setPosts(fetchedPosts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    const postCollectionRef = collection(firestore, "Posts");
    const unsubscribe = onSnapshot(postCollectionRef, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => {
        const post = doc.data() as Post;
        fetchUsername(post.userId).then((username) => {
          setPosts((prevPosts) =>
            prevPosts.map((prevPost) =>
              prevPost.id === doc.id ? { ...post, username } : prevPost
            )
          );
        });
        return {
          ...post,
          id: doc.id,
        };
      });
    });

    fetchPosts();

    return () => unsubscribe();
  }, []);

  return (
    <div className="fetch-all-posts__container">
      {posts.map((post) => (
        <div key={post.id}>
          <p>Username: {post.username}</p>
          <p>Content: {post.content}</p>
          <p>CreatedAt: {post.createdAt.toDate().toLocaleString()}</p>
          <p>Comments: {post.comments ? post.comments.length : 0}</p>
          <p>Reactions: {post.reactions ? post.reactions.length : 0}</p>    </div>
      ))}
    </div>
  );
}
