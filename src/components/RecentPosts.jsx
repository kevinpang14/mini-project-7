import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const RecentPosts = ({ posts, isBlogDetailPage = false }) => {
  if (posts.length < 4) {
    console.error("At least 4 posts are needed to generate this layout.");
    return null;
  }

  console.log("posts[0] key", posts[0].key);

  return (
    <>
      <Helmet>
        <title>Recent Blog Posts</title>
        <meta
          name="description"
          content="Check out the latest blog posts on our website!"
        />
        <meta property="og:title" content="Recent Blog Posts" />
        <meta
          property="og:description"
          content="Stay updated with the latest blog posts."
        />
        <meta property="og:url" content="" />
      </Helmet>
      <div className=" container mx-auto my-10">
        <h2 className="text-3xl font-semibold mb-4">Recent Blog Posts</h2>

        <div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          style={{
            display: "grid",
            gridTemplateAreas:
              window.innerWidth >= 1024 && !isBlogDetailPage
                ? `
          "post1 post2"
          "post1 post3"
          "post4 post4"
        `
                : `"post1" "post2" "post3" "post4"`,
            gridTemplateColumns:
              window.innerWidth >= 1024 && !isBlogDetailPage
                ? "1fr 1fr"
                : "1fr",
            gridAutoRows: "auto",
          }}
        >
          {/* Post 1 */}
          <Link
            to={`/detail/${posts[0].key}`}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            style={{ gridArea: "post1" }}
          >
            <img
              src={posts[0].thumb}
              alt={posts[0].title}
              className="w-full h-48 object-cover"
            />
            <div className="pt-4 flex flex-col">
              <h3 className="text-lg font-semibold">{posts[0].title}</h3>
              <p className="text-gray-600">
                {posts[0].author} | {posts[0].time}
              </p>

              <p className="mt-2">
                {posts[0].desc.length > 100
                  ? `${posts[0].desc.substring(0, 50)}...`
                  : posts[0].desc}
              </p>
              <p className="text-sm text-gray-500 mb-2">{posts[0].tag}</p>
            </div>
          </Link>

          {/* Post 2 */}
          <Link
            to={`/detail/${posts[1].key}`}
            className={`bg-white shadow-md rounded-lg overflow-hidden flex ${
              isBlogDetailPage ? "flex-col" : "flex"
            }`}
            style={{ gridArea: "post2" }}
          >
            <img
              src={posts[1].thumb}
              alt={posts[1].title}
              className={`h-48 object-cover ${
                isBlogDetailPage ? "w-full" : "w-1/2"
              }`}
            />
            <div
              className={`p-4 flex flex-col justify-between ${
                isBlogDetailPage ? "w-full" : "w-1/2"
              }`}
            >
              <h3 className="text-lg font-semibold">{posts[1].title}</h3>
              <p className="text-gray-600">
                {posts[1].author} | {posts[1].time}
              </p>

              <p className="mt-2">
                {posts[1].desc.length > 100
                  ? `${posts[1].desc.substring(0, 50)}...`
                  : posts[1].desc}
              </p>
              <p className="text-sm text-gray-500 mb-2">{posts[1].tag}</p>
            </div>
          </Link>

          {/* Post 3 */}
          <Link
            to={`/detail/${posts[2].key}`}
            className={`bg-white shadow-md rounded-lg overflow-hidden flex ${
              isBlogDetailPage ? "flex-col" : "flex"
            }`}
            style={{ gridArea: "post3" }}
          >
            <img
              src={posts[2].thumb}
              alt={posts[2].title}
              className={`h-48 object-cover ${
                isBlogDetailPage ? "w-full" : "w-1/2"
              }`}
            />
            <div
              className={`p-4 flex flex-col justify-between ${
                isBlogDetailPage ? "w-full" : "w-1/2"
              }`}
            >
              <h3 className="text-lg font-semibold">{posts[2].title}</h3>
              <p className="text-gray-600">
                {posts[2].author} | {posts[2].time}
              </p>

              <p className="mt-2">
                {posts[2].desc.length > 100
                  ? `${posts[2].desc.substring(0, 50)}...`
                  : posts[2].desc}
              </p>
              <p className="text-sm text-gray-500 mb-2">{posts[2].tag}</p>
            </div>
          </Link>

          {/* Post 4 */}
          <Link
            to={`/detail/${posts[3].key}`}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            style={{ gridArea: "post4" }}
          >
            <img
              src={posts[3].thumb}
              alt={posts[3].title}
              className="w-full h-48 object-cover"
            />
            <div className="pt-4 flex flex-col">
              <h3 className="text-lg font-semibold">{posts[3].title}</h3>
              <p className="text-gray-600">
                {posts[3].author} | {posts[3].time}
              </p>

              <p className="mt-2">
                {posts[3].desc.length > 100
                  ? `${posts[3].desc.substring(0, 50)}...`
                  : posts[3].desc}
              </p>
              <p className="text-sm text-gray-500 mb-2">{posts[3].tag}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RecentPosts;
