import React, { useState } from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  const postsPerPage = 6; // Number of posts per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Get the posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Handlers for navigating pages
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="all-posts container mx-auto my-10">
      <h2 className="text-3xl font-semibold mb-4">All Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Link
            key={post.key}
            to={`/detail/${post.key}`}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={post.thumb}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-[#7F56D9]">
                {post.author} • {post.time}
              </p>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.tag}</p>
              <p className="mt-2">
                {post.desc.length > 100
                  ? `${post.desc.substring(0, 100)}...`
                  : post.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-gray-500 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "hover:text-gray-700"
          }`}
        >
          <span className="material-icons">{`arrow_back`}</span>
          <span>Previous</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-gray-500 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:text-gray-700"
          }`}
        >
          <span>Next</span>
          <span className="material-icons">{`arrow_forward`}</span>
        </button>
      </div>
    </div>
  );
};

export default Posts;
