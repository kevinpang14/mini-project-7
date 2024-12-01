import React from "react";

const Newsletter = () => {
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
      <div className="flex flex-col sm:flex-row items-center mb-6 space-x-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-[#7F56D9] text-white p-2 rounded-lg  hover:bg-[#7F56D9]">
          Subscribe
        </button>
      </div>
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
