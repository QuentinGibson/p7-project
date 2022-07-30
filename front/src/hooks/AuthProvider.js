import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import useLocalStorage from "./useLocalStorage";
function AuthProvider({ children }) {
  const [token, updateToken, removeToken] = useLocalStorage("token", null);
  const [user_id, updateUser, removeUser] = useLocalStorage("user_id", -1);
  const [, updateSeen, removeSeen] = useLocalStorage("seen", []);
  const navigate = useNavigate();
  useEffect(() => {
    if (token && user_id !== -1) {
      getSeen();
    }
  }, [token, user_id]);

  const login = (email, password) => {
    const loginUrl = "/api/auth/login";
    axios.post(loginUrl, { email, password }).then((res) => {
      try {
        updateToken(res.data.token);
        updateUser(res.data.user_id);
        navigate("/");
      } catch (e) {}
    });
  };
  const signup = (email, password) => {
    const signupUrl = "/api/auth/signup";
    axios.post(signupUrl, { email, password }).then((res) => {
      try {
        navigate("/auth/login");
      } catch (e) {}
    });
  };
  const signout = () => {
    removeToken();
    removeUser();
    removeSeen();
    window.location.reload(false);
  };

  const del = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .delete("/api/user/", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  stateUser: user_id,
                },
              })
              .then((res) => {
                navigate("/auth/login");
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            window.location.reload(false);
          },
        },
      ],
    });
  };
  function getSeen() {
    if (token === null) {
      return;
    }
    axios
      .get(`/api/user/${user_id}/seen`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        updateSeen(res.data.postIdList);
      });
  }
  const values = {
    token,
    user_id,
    signup,
    login,
    signout,
    del,
    getSeen,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
