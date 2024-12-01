import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecentPosts,
  fetchPosts,
  fetchPostDetail,
} from "../redux/blogsSlice";
import Header from "../components/Header";
import RecentPosts from "../components/RecentPosts";
import Posts from "../components/Posts";
import Newsletter from "../components/Newsletter";

const Blog = () => {
  const dispatch = useDispatch();
  // destructure the state from the Redux store
  const { recentPosts, posts, status, error, postDetail } = useSelector(
    (state) => state.blogs
  );
  const slug = "2024/11/28/steam-autumn-sale-28112024"; // test slug

  useEffect(() => {
    console.log("Fetching posts...");
    dispatch(fetchRecentPosts());
    dispatch(fetchPosts());
    dispatch(fetchPostDetail(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    console.log("Recent Posts:", recentPosts);
    console.log("Posts:", posts);
    // console.log("Recent Posts [0] key:", recentPosts[0].key);
    console.log("Post Detail:", postDetail);
  }, [recentPosts, posts, postDetail]);

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div>
      <div className=" max-w-7xl mx-auto py-4 px-4 sm:px-6">
        <Header />
        <RecentPosts posts={recentPosts} />
        <Posts posts={posts} />
      </div>
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
          {/* Newsletter Section */}
          <div className="lg:col-span-2 lg:col-start-2 p-6 mt-6">
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
