import axios from "axios";
import React from "react";
export default async function useCurrentPost(post_id) {
  const post = await axios.get(`/api/post/${post_id}`).then((res) => {
    return res.data.post;
  });
  return [post];
}
