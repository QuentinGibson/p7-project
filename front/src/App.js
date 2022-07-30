import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  MasterLayout,
  Feed,
  User,
  AuthLayout,
  LogIn,
  SignUp,
  CreatePost,
  SinglePost,
  NewCommentForm,
  EditCommentForm,
  EditPostForm,
  RequireAuth,
} from "./components";
import AuthProvider from "./hooks/AuthProvider";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MasterLayout />}>
                <Route index element={<Feed />} />
                <Route path="/posts/:post_id">
                  <Route index element={<SinglePost />}></Route>
                  <Route path="edit" element={<EditPostForm />}></Route>
                  <Route path="comments">
                    <Route
                      path="new"
                      element={
                        <RequireAuth>
                          <NewCommentForm />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path=":comment_id/edit"
                      element={<EditCommentForm />}
                    />
                  </Route>
                </Route>
                <Route path="/user" element={<User />} />
                <Route
                  path="/newpost"
                  element={
                    <RequireAuth>
                      <CreatePost />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LogIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
