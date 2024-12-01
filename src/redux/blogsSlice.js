import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRecentPosts,
  getPosts,
  getPostDetail,
  subscribe,
} from "../services/api";

// handle api integration
// Fetch recent posts
export const fetchRecentPosts = createAsyncThunk(
  "blogs/fetchRecentPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecentPosts();
      console.log("recent post response.data: ", response.data);
      const limitedPosts = response.data.slice(0, 4);
      console.log("limitedPosts: ", limitedPosts);
      return limitedPosts;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch recent posts.");
    }
  }
);

// Fetch posts
export const fetchPosts = createAsyncThunk(
  "blogs/fetchPosts",
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await getPosts(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch posts.");
    }
  }
);

// Fetch post detail
export const fetchPostDetail = createAsyncThunk(
  "blogs/fetchPostDetail",
  async (slug, { rejectWithValue }) => {
    try {
      console.log("Fetching post detail for slug:", slug);
      const response = await getPostDetail(slug);
      console.log("response post detail: ", response);
      console.log("response.data: ", response.data);
      console.log("response.data.results: ", response.data.results);
      return response.data.results;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch post details.");
    }
  }
);

// subscription
export const subscribeUser = createAsyncThunk(
  "subscription/subscribeUser",
  async (email, { rejectWithValue }) => {
    try {
      const response = await subscribe(email);
      console.log("response.data email: ", response.data);
      return response.data; // Handle success, and return data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
    message: "",
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
      })

      // Subscription
      .addCase(subscribeUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message; // Success message from API
      })
      .addCase(subscribeUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default blogsSlice.reducer;
