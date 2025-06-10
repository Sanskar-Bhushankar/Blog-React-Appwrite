import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../../appwrite/config";

function PostCard({ $id, title, featuredimage, authorName, $createdAt }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col h-80">
        <div className="w-full h-48">
          {featuredimage ? (
            <img
              src={appwriteService.getFileView(featuredimage)}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => (e.target.src = "/placeholder.jpg")} // Fallback image
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {title}
          </h2>
          {authorName && (
            <p className="text-sm text-gray-600">
              By <span className="font-medium text-blue-600">{authorName}</span>
            </p>
          )}
          <p className="text-xs text-gray-500 mt-auto">
            {new Date($createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;