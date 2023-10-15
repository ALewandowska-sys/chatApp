import React from "react";
import "./AddNewPost.scss";
import { Timestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import CreatePostTextArea from "../../common/components/form/CreatePostTextArea";
import Flex from "../../common/components/layouts/Flex";
import Input from "../../common/components/form/Input";

interface IAddNewPostForm {
  content: string;
}

export default function AddNewPost() {
  const { register, formState } = useForm<IAddNewPostForm>({
    mode: "onTouched",
  });

  const [user] = useAuthState(auth);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(formState);
    handlePublish();
  };

  // Function to handle publishing a new post
  const handlePublish = async () => {

    if (user) {
      // Prepare the new post data
      const postCollectionRef = collection(firestore, "Posts");
      const newPost = {
        userId: user.uid,
        content: "",// content,
        createdAt: Timestamp.now().toDate(),
        comments: [],
        reactions: [], // Initialize an empty array to store reactions (will be updated later)
      };

      try {
        // Add the new post to the Firestore collection
        await addDoc(postCollectionRef, newPost);
        console.log("Post published successfully!");
      } catch (error) {
        console.log("Error publishing the post:", error);
      }
    }
  };

  return (
    <div className="add-new-post__container container">
      <form className="add-new-post">
        <h4 className="add-new-post__labelWrapper">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="add-new-post__label"
          >
            Write a post
          </label>
        </h4>
        <CreatePostTextArea
          register={register}
          errorMessages={formState.errors?.content?.message}
        />
        <Flex right>
          <Input 
            onClick={onSubmit}
            isInvalid={!formState.isValid} 
            value="Publish"
          />
        </Flex>
      </form>
    </div>
  );
}
