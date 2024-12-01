import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentPosts, fetchPostDetail } from "../redux/blogsSlice";
import RecentPosts from "../components/RecentPosts";

const BlogDetail = () => {
  const { slug } = useParams(); // Extract slug from the URL
  const dispatch = useDispatch();

  // Fetch data from Redux store
  const { recentPosts, postDetail, status, error } = useSelector(
    (state) => state.blogs
  );

  console.log("slug");

  useEffect(() => {
    if (slug) {
      // Fetch recent posts and the blog detail using slug
      dispatch(fetchRecentPosts());
      dispatch(fetchPostDetail(slug));
    } // Use slug for fetching details
  }, [dispatch, slug]);

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className=" max-w-7xl mx-auto py-4 my-10 px-4 sm:px-6 ">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6">
        {/* Recent Posts Section (1/3) */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
          <RecentPosts posts={recentPosts} isBlogDetailPage={true} />
        </div>

        {/* Blog Detail Section (2/3) */}
        <div className="col-span-2 p-6">
          <h1 className="text-3xl font-bold mb-6">{postDetail?.title}</h1>
          <p className="text-gray-600 mb-3">
            {postDetail?.author} | {postDetail?.date}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Categories: {postDetail?.categories?.join(", ")}
          </p>

          {/* Render dynamic content */}
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: postDetail?.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
