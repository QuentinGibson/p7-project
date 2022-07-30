import axios from "axios";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
export default function useCreatePosts() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  function createPost(payload) {
    const createPostUrl = "/api/post/";
    navigate(`/`);
    axios
      .post(createPostUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {});
  }
  return [createPost];
}
