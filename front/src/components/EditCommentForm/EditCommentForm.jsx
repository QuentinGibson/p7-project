import { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";
import axios from "axios";

export default function EditCommentForm() {
  const { user_id, token } = useContext(AuthContext);
  const bodyReference = useRef();
  const navigate = useNavigate();
  const { comment_id, post_id } = useParams();
  async function handleSubmit(event) {
    event.preventDefault();
    navigate(`/posts/${post_id}`);
    const body = bodyReference.current.value;
    await axios
      .put(
        `/api/comment/${comment_id}`,
        { user_id, body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {});
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto bg-white shadow rounded"
      encType="multipart/form-data"
      method="post"
    >
      <div>
        <div className="xl:w-full border-b border-gray-700 py-5">
          <div className="flex items-center w-11/12 mx-auto">
            <p className="text-lg text-gray-800 font-bold">Edit Comment Form</p>
          </div>
        </div>
        <div className="w-11/12 mx-auto">
          <div className="container mx-auto">
            <div className="my-8 mx-auto xl:w-full xl:mx-0">
              <div className="flex flex-wrap justify-between">
                <div className="w-full flex flex-col mb-6">
                  <label
                    htmlFor="body"
                    className="pb-2 ml-1 text-left text-sm font-bold text-gray-800 "
                  >
                    Body
                  </label>
                  <input
                    ref={bodyReference}
                    type="text"
                    name="body"
                    required
                    id="body"
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
