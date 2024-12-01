import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecentPosts, getPosts, getPostDetail } from "../services/api";

// handle api integration
// Fetch recent posts
export const fetchRecentPosts = createAsyncThunk(
  "blogs/fetchRecentPosts",
  async () => {
    const response = await getRecentPosts();
    console.log("recent post response.data: ", response.data);
    const limitedPosts = response.data.slice(0, 4);
    console.log("limitedPosts: ", limitedPosts);
    return limitedPosts;
  }
);

// Fetch posts
export const fetchPosts = createAsyncThunk(
  "blogs/fetchPosts",
  async (page = 1) => {
    const response = await getPosts(page);
    return response.data;
  }
);

// Fetch post detail
export const fetchPostDetail = createAsyncThunk(
  "blogs/fetchPostDetail",
  async (slug) => {
    console.log("Fetching post detail for slug:", slug);
    const response = await getPostDetail(slug);
    console.log("response post detail: ", response);
    console.log("response.data: ", response.data);
    console.log("response.data.results: ", response.data.results);
    return response.data.results;
  }
);

// ------------------------------------------------------------

// Slice

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    recentPosts: [],
    posts: [],
    postDetail: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Recent Posts
      .addCase(fetchRecentPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecentPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recentPosts = action.payload;
      })
      .addCase(fetchRecentPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = `Error fetching recent posts: ${action.error.message}`;
      })

      // Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = `Error fetching posts: ${action.error.message}`;
      })

      // Post Detail
      .addCase(fetchPostDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.postDetail = action.payload;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = `Error fetching post detail: ${action.error.message}`;
      });
  },
});

export default blogsSlice.reducer;
