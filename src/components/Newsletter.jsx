import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscribeUser } from "../redux/blogsSlice";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, message, error } = useSelector((state) => state.blogs);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(subscribeUser(email));
    }
  };

  return (
    <div className="bg-white text-black py-10 px-4 flex flex-col items-center justify-center">
      <p className="text-sm mb-2 text-[#7F56D9] font-semibold">Newsletter</p>
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Stories and interviews
      </h2>
      <p className="mb-6 text-center">
        Subscribe to learn about new product features, the latest in technology,
        solutions, and updates.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center mb-6 space-x-2"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2  focus:ring-[#7F56D9]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#7F56D9] text-white p-2 rounded-lg hover:bg-[#7F56D9]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status === "succeeded" && (
        <p className="text-green-500 mt-2">{message}</p>
      )}
      {status === "failed" && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-sm mb-4 text-center">
        We care about your data in our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        .
      </p>
    </div>
  );
};

export default Newsletter;
