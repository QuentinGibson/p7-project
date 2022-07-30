import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import useCreateSeen from "../../hooks/createSeen";

export default function Post(props) {
  const [createSeen] = useCreateSeen();
  return (
    <li>
      {!props.seen && (
        <div>
          <p className="bg-cyan-700 rounded-md p-1 mb-3 w-3/12 text-white">
            New!
          </p>
        </div>
      )}
      <Link to={`/posts/${props.id}`}>
        <Waypoint
          bottomOffset="30%"
          onTopOffset="40%"
          onEnter={({ previousPosition, currentPosition, event }) => {
            if (currentPosition === "inside" && props.seen === false) {
              if (!props.seen) {
                createSeen(props.id);
              }
            }
          }}
        >
          <div className="max-w-sm rounded mb-5">
            <div className="bg-white dark:bg-gray-800 rounded-t flex flex-col justify-between items-start pt-3 px-4">
              <div className="flex items-center">
                <p className="text-2xl font-semibold leading-4 text-gray-800 dark:text-gray-100">
                  {props.title}
                </p>
              </div>
              <p className="text-base font-medium leading-loose text-right text-gray-500 dark:text-gray-400">
                {moment(props.createdAt).fromNow()}
              </p>
            </div>
            <img
              className="w-full"
              src={props.image}
              alt="Engoy this image from our user"
            />
            <div className="bg-white dark:bg-gray-800 flex w-full items-center px-4 py-3">
              <p className="text-base font-medium leading-loose text-right text-gray-500 dark:text-gray-400">
                {props.user}
              </p>
            </div>
          </div>
        </Waypoint>
      </Link>
    </li>
  );
}
