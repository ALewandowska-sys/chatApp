import FetchAllPosts from "../../components/fetch_all_posts/FetchAllPosts";
import AddNewPost from "../../components/add_new_post/AddNewPost";

export default function PagesUserHome() {
  return (
    <>
      <AddNewPost />
      <FetchAllPosts />
    </>
  );
}
