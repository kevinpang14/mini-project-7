import React from "react";

const Header = () => {
  return (
    <header
      className="w-full flex justify-center items-center text-center py-2.5 border-t-4 border-b-4"
      style={{ borderColor: "rgba(0, 0, 0, 0.34)" }}
    >
      <h1 className="md:text-[12rem] sm:text-8xl text-6xl font-bold">
        THE BLOG
      </h1>
    </header>
  );
};

export default Header;
