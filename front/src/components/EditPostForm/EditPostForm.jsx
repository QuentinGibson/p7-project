import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";

export default function EditPostFrom() {
  const titleRef = useRef();
  const fileRef = useRef();
  const { user_id, token } = useContext(AuthContext);
  const { post_id } = useParams();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    navigate(`/posts/${post_id}`);
    const payload = new FormData();
    const post = { user_id, title: titleRef.current.value };
    payload.append("image", fileRef.current.files[0]);
    payload.append("post", JSON.stringify(post));
    await axios.put(`/api/post/${post_id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto bg-white shadow rounded"
      method="post"
    >
      <div>
        <div className="xl:w-full border-b border-gray-700 py-5">
          <div className="flex items-center w-11/12 mx-auto">
            <p className="text-lg text-gray-800 font-bold">Edit Post Form</p>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <div className="container mx-auto">
            <div className="my-8 mx-auto xl:w-full xl:mx-0">
              <div className="flex flex-wrap justify-between">
                <div className="w-full flex flex-col mb-6">
                  <label
                    htmlFor="title"
                    className="pb-2 ml-1 text-left text-sm font-bold text-gray-800 "
                  >
                    Title
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    name="title"
                    id="title"
                    className="border border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 "
                  />
                </div>
                <div className="w-full flex flex-col mb-6">
                  <label
                    htmlFor="image"
                    className="pb-2 ml-1 text-left text-sm font-bold text-gray-800 "
                  >
                    File
                  </label>
                  <input
                    ref={fileRef}
                    type="file"
                    name="image"
                    id="image"
                    className="border border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-4 sm:px-12 px-4 bg-gray-100 dark:bg-gray-700 mt-6 flex justify-end rounded-bl rounded-br">
          <button
            className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
