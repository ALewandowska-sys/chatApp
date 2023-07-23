import React, { useState } from "react";
import "./AddNewPost.scss";
import { Post } from "../../interfaces/Post";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AddNewPost() {
  const [post, setPost] = useState<Post>({
    userId: "",
    content: "",
    createdAt: Timestamp.now().toDate(),
    comments: [],
    reactions: [],
  });

  const [user] = useAuthState(auth);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handlePublish = async () => {
    if (!post.content) {
      alert("Post nie może być pusty");
      return;
    } else {
      if (user) {
        // Sprawdzenie, czy user nie jest null ani undefined
        const postCollectionRef = collection(firestore, "Posts");
        const newPost: Post = {
          userId: user.uid,
          content: post.content,
          createdAt: post.createdAt,
          comments: [],
          reactions: [],
        };
        try {
          await addDoc(postCollectionRef, newPost);
          // Zresetuj stan posta po pomyślnym opublikowaniu
          setPost({
            userId: "",
            content: "",
            createdAt: Timestamp.now().toDate(),
            comments: [],
            reactions: [],
          });
          console.log("clock");
          console.log(newPost);
        } catch (error) {
          console.log("Błąd podczas publikowania posta:", error);
        }
      }
    }
  };

  return (
    <div className="add-new-post__container">
      <div className="add-new-post">
        <h4>
          <label
            htmlFor="exampleFormControlTextarea1"
            className="add-new-post__label"
          >
            Napisz post
          </label>
        </h4>
        <textarea
          className="add-new-post__text-area"
          placeholder="Jak się dziś czujesz?"
          rows={3}
          name="content"
          value={post.content}
          onChange={handleChange}
        ></textarea>
        <input
          type="button"
          className="add-new-post__submit-btn"
          value="Publikuj"
          onClick={handlePublish}
        />
      </div>
    </div>
  );
}
