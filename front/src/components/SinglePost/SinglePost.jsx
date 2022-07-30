import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useContext } from "react";
import AuthContext from "../../hooks/AuthContext";

export default function SinglePost() {
  const { post_id } = useParams();
  const [reload, setReload] = useState();
  const [post, setPost] = useState({});
  const [timeAgo, setTimeAgo] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { user_id, token } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/api/post/${post_id}`).then((res) => {
      setPost(res.data.post);
    });
  }, []);
  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
    const timeAgo = new TimeAgo("en-US");
    setTimeAgo(timeAgo);
    axios.get(`/api/post/${post_id}/comments`).then((res) => {
      setComments(res.data.comments);
    });
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <button
          className="bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        {user_id === post.creatorId && (
          <div>
            <Link
              className="bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-3 py-2 mr-2 text-sm"
              to={`/posts/${post_id}/edit`}
            >
              Edit
            </Link>
            <button
              className="bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-3 py-2 mr-2 text-sm"
              onClick={(event) => {
                event.preventDefault();
                navigate(`/`);
                axios.delete(`/api/post/${post_id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="text-4xl font-sans font-bold">{post.title}</h1>
        <img className="m-4" src={post.image} alt={`Image for ${post.id}`} />
        <div className="flex">
          <Link
            className="bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm"
            to={`/posts/${post.id}/comments/new`}
          >
            New Comment
          </Link>
        </div>
      </div>

      <div id="comments" className="container flex flex-col items-center">
        <h2 className="text-3xl">Comments</h2>
        {comments.length > 0 ? (
          <ul className="max-w-screen-md w-full">
            {comments.map((comment, index) => (
              <li key={index}>
                <div className="flex flex-col border-spacing-1 border-2 border-slate-500 rounded my-4 px-2 pt-1 pb-2 border-solid">
                  <div className="flex">
                    <p className="text-black text-sm">
                      {comment.User.email}
                      {" - "}
                      {timeAgo.format(new Date(comment.createdAt))}
                    </p>
                  </div>
                  <p className="flex justify-start text-gray-800 text-lg">
                    {comment.body}
                  </p>
                  {comment.userId === user_id && (
                    <div className="flex">
                      <Link
                        className="bg-blue-300  transition duration-150 ease-in-out rounded border border-blue-300 text-white px-2 py-1 mr-2 text-sm"
                        to={`/posts/${post_id}/comments/${comment.id}/edit`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={async () => {
                          await axios.delete(`/api/comment/${comment.id}`, {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          });
                          setComments((prevState) => {
                            return prevState.filter(
                              (obj) => obj.id !== comment.id
                            );
                          });
                        }}
                        className="bg-red-500  transition duration-150 ease-in-out rounded border border-red-500 text-white px-2 py-1 mr-2 text-sm"
                      >
                        Remove{" "}
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Create the first comment!</div>
        )}
      </div>
    </div>
  );
}
