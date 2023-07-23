import React from "react";
import "./AddNewPost.scss";

export default function AddNewPost() {
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
        ></textarea>
        <input
          type="button"
          className="add-new-post__submit-btn"
          value="Publikuj"
        />
      </div>
    </div>
  );
}

// articles 9:36

// import firebase from "firebase/app";
// import "firebase/auth";
// import { auth } from "../../firebase/firebase.config";
// import { Auth } from "firebase/auth";

// export default function AddNewPost() {
//   const [user] = useAuthState(auth);

//   return (
//     <>
//       <h4>
//         <label
//           htmlFor="exampleFormControlTextarea1"
//           className="form-label px-2"
//         >
//           Write a post
//         </label>
//       </h4>
//       <textarea
//         className="form-control bg-dark text-white"
//         id="exampleFormControlTextarea1"
//         onChange={(text) => handleSetTextPost(text)}
//         placeholder="Tell us how you doing?"
//         rows={3}
//       ></textarea>
//       <input
//         type="button"
//         className="btn btn-primary mt-2"
//         value="Publish"
//         onClick={handleAddPost}
//       />
//     </>
//   );
// }

// function useAuthState(auth: Auth): [any] {
//   throw new Error("Function not implemented.");
// }
