import axios from "axios";
import React, { useContext } from "react";
import useLocalStorage from "./useLocalStorage";
import AuthContext from "./AuthContext";
export default function useCreateSeen() {
  const { token, user_id, getSeen } = useContext(AuthContext);

  async function createSeen(id) {
    if (token && user_id !== -1) {
      const url = `/api/post/${id}/seen`;
      await axios
        .post(
          url,
          { user_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status.toString()[0] === "2") {
            console.log("create seen record for " + id);
          }
        });
    }
  }
  return [createSeen];
}
