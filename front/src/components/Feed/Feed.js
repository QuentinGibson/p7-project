import React from "react";
import usePosts from "../../hooks/usePosts";
import { Link } from "react-router-dom";

const Feed = (props) => {
  const [posts] = usePosts();
  return (
    <ul className="flex-col items-center">
      <div className="my-6 lg:my-8 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div>
          <h4 className="text-left text-2xl font-bold leading-tight text-gray-800">
            Most Recent
          </h4>
        </div>
        <div className="mt-6 lg:mt-0">
          <Link
            to="/newpost"
            className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white ml-3 px-4 py-2 text-sm"
          >
            New Post
          </Link>
        </div>
      </div>
      {posts}
    </ul>
  );
};

export default Feed;
