import React, { useRef, useContext } from "react";
import { useState } from "react";
import AuthContext from "../../hooks/AuthContext";
import useCreatePosts from "../../hooks/useCreatePosts";

const CreatePost = () => {
  let form = useRef(null);
  const { user_id } = useContext(AuthContext);
  const [createPost] = useCreatePosts();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const titleReference = useRef();
  const imageReference = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFilePicked) {
    }
    const payload = new FormData();
    const post = {
      user_id,
      title: titleReference.current.value,
    };
    payload.append("post", JSON.stringify(post));
    payload.append("image", imageReference.current.files[0]);
    createPost(payload);
  };
  return (
    <div className="xl:w-3/5">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="container mx-auto bg-white shadow rounded"
        encType="multipart/form-data"
        method="post"
      >
        <div>
          <div className="xl:w-full border-b border-gray-700 py-5">
            <div className="flex items-center w-11/12 mx-auto">
              <p className="text-lg text-gray-800 font-bold">Create a Post</p>
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
                      ref={titleReference}
                      type="text"
                      name="title"
                      required
                      id="title"
                      className="border border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 "
                    />
                  </div>
                  <div className="w-full flex flex-col mb-6">
                    <label
                      htmlFor="image"
                      className="pb-2 ml-1 text-left text-sm font-bold text-gray-800 "
                    >
                      Image
                    </label>
                    <input
                      ref={imageReference}
                      onChange={changeHandler}
                      accept="image/*"
                      type="file"
                      name="image"
                      required
                      id="image"
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
    </div>
  );
};
export default CreatePost;
