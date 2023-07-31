import React, { useState } from "react";
import "./AddNewPost.scss";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AddNewPost() {
  const [content, setContent] = useState("");

  // Get the current user from Firebase Authentication
  const [user] = useAuthState(auth);

  // Function to handle changes in the textarea input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Function to handle publishing a new post
  const handlePublish = async () => {
    console.log("publish click");

    if (!content) {
      alert("Post cannot be empty");
      return;
    } else {
      if (user) {
        console.log("if user is logged in");

        // Prepare the new post data
        const postCollectionRef = collection(firestore, "Posts");
        const newPost = {
          userId: user.uid, 
          content: content, 
          createdAt: Timestamp.now().toDate(), 
          comments: [], 
          reactions: [], // Initialize an empty array to store reactions (will be updated later)
        };

        try {
          // Add the new post to the Firestore collection
          await addDoc(postCollectionRef, newPost);
          setContent(""); // Reset the content state after successful publishing
          console.log("Post published successfully!");
        } catch (error) {
          console.log("Error publishing the post:", error);
        }
      }
    }
  };

  return (
    <div className="add-new-post__container">
      <div className="add-new-post">
        <h4>
          <label htmlFor="exampleFormControlTextarea1" className="add-new-post__label">
            Write a post
          </label>
        </h4>
        <textarea
          className="add-new-post__text-area"
          placeholder="How are you feeling today?"
          rows={3}
          name="content"
          value={content}
          onChange={handleChange}
        ></textarea>
        <input
          type="button"
          className="add-new-post__submit-btn"
          value="Publish"
          onClick={handlePublish}
        />
      </div>
    </div>
  );
}
