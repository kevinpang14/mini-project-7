import React from "react";

const Footer = () => {
  return (
    <footer className=" text-black text-center py-4">
      <div className="flex justify-start space-x-4 mt-2 ml-4">
        <p className="text-black text-xl">&copy; 2024</p>
        <a href="#" className="text-black text-xl">
          Twitter
        </a>
        <a href="#" className="text-black text-xl">
          LinkedIn
        </a>
        <a href="#" className="text-black text-xl">
          Email
        </a>
        <a href="#" className="text-black text-xl">
          RSS Feed
        </a>
        <a href="#" className="text-black text-xl">
          Add to Feedly
        </a>
      </div>
    </footer>
  );
};

export default Footer;
