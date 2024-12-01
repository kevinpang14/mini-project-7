import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Blog from "../../pages/Blog";
import {
  fetchRecentPosts,
  fetchPosts,
  fetchPostDetail,
} from "../../redux/blogsSlice";

// Mock actions
jest.mock("../../redux/blogsSlice", () => ({
  fetchRecentPosts: jest.fn(),
  fetchPosts: jest.fn(),
  fetchPostDetail: jest.fn(),
}));

const mockStore = configureStore([]);

describe("Blog Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      blogs: {
        recentPosts: [
          {
            key: "post1",
            title: "Post 1",
            thumb: "thumb1.jpg",
            desc: "This is a description for post 1.",
            author: "Author 1",
            time: "10:00 AM",
            tag: "Tag1",
          },
          {
            key: "post2",
            title: "Post 2",
            thumb: "thumb2.jpg",
            desc: "Description for post 2.",
            author: "Author 2",
            time: "11:00 AM",
            tag: "Tag2",
          },
          {
            key: "post3",
            title: "Post 3",
            thumb: "thumb3.jpg",
            desc: "Description for post 3.",
            author: "Author 3",
            time: "12:00 PM",
            tag: "Tag3",
          },
          {
            key: "post4",
            title: "Post 4",
            thumb: "thumb4.jpg",
            desc: "Description for post 4.",
            author: "Author 4",
            time: "1:00 PM",
            tag: "Tag4",
          },
        ],

        posts: [
          { id: "1", title: "Blog Post 1" },
          { id: "2", title: "Blog Post 2" },
        ],
        postDetail: {
          title: "Post Detail Title",
          author: "Author Name",
          date: "2024-11-28",
          categories: ["Category1", "Category2"],
          content: "<p>Post content goes here</p>",
        },
        status: "succeeded",
        error: null,
      },
    });
  });

  it("should render loading state", () => {
    store = mockStore({
      blogs: {
        recentPosts: [],
        posts: [],
        postDetail: null,
        status: "loading",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should render error state", () => {
    store = mockStore({
      blogs: {
        recentPosts: [],
        posts: [],
        postDetail: null,
        status: "failed",
        error: "Something went wrong",
      },
    });

    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );

    expect(
      screen.getByText(/error: something went wrong/i)
    ).toBeInTheDocument();
  });

  it("should render recent posts and blog details", async () => {
    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );

    // Assert recent posts
    const recentPostsHeading = screen.getByText(/recent blog posts/i);
    expect(recentPostsHeading).toBeInTheDocument();

    // Assert blog detail section
    const detailTitle = screen.getByText(/post detail title/i);
    expect(detailTitle).toBeInTheDocument();

    // Assert dynamic content
    const dynamicContent = screen.getByText(/post content goes here/i);
    expect(dynamicContent).toBeInTheDocument();
  });

  it("should dispatch actions on mount", async () => {
    render(
      <Provider store={store}>
        <Blog />
      </Provider>
    );

    // Wait for useEffect actions
    await waitFor(() => {
      expect(fetchRecentPosts).toHaveBeenCalled();
      expect(fetchPosts).toHaveBeenCalled();
      expect(fetchPostDetail).toHaveBeenCalledWith(
        "2024/11/28/steam-autumn-sale-28112024"
      );
    });
  });
});
