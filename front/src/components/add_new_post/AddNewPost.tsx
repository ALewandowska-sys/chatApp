import React, { useState } from "react";
import "./AddNewPost.scss";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AddNewPost() {
  const [content, setContent] = useState("");

  const [user] = useAuthState(auth);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePublish = async () => {
    console.log("clck");
    if (!content) {
      alert("Post nie może być pusty");
      return;
    } else {
      if (user) {
        console.log("if user");

        //olc@wp.pl UTZg6.uBgqWq6m

        const postCollectionRef = collection(firestore, "Posts");
        const newPost = {
          userId: user.uid,
          content: content,
          createdAt: Timestamp.now().toDate(),
          comments: [],
          reactions: [],
        };
        try {
          await addDoc(postCollectionRef, newPost);
          setContent(""); // Resetuj stan po pomyślnym opublikowaniu
          console.log("Post opublikowany pomyślnie!");
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
          value={content}
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
