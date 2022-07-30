import React, { useEffect, useContext } from "react";
import axios from "axios";
import { Post } from "../components";
import AuthContext from "./AuthContext";
import useLocalStorage from "./useLocalStorage";
export default function usePosts() {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = React.useState([]);
  const [seen] = useLocalStorage("seen", []);
  async function getPosts() {
    await axios.get("/api/post").then((res) => {
      try {
        const collectedPosts = res.data.posts.map((post, index) => {
          const user_email = post.User.email;
          const hasSeen =
            seen.length >= 1
              ? seen.indexOf(post.id) !== -1
              : (() => {
                  return token === null;
                })();
          return (
            <Post
              title={post.title}
              image={post.image}
              key={index}
              id={post.id}
              user={user_email}
              seen={hasSeen}
              createdAt={post.createdAt}
            ></Post>
          );
        });
        setPosts(collectedPosts);
      } catch (e) {}
    });
  }
  useEffect(() => {
    getPosts();
  }, [seen]);
  return [posts];
}
