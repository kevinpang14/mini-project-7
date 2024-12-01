import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Posts from "../../components/Posts";

describe("Posts Component Pagination Logic", () => {
  const generateMockPosts = (count) =>
    Array.from({ length: count }, (_, i) => ({
      key: `${i + 1}`,
      thumb: `thumb${i + 1}.jpg`,
      title: `Post ${i + 1}`,
      author: `Author ${i + 1}`,
      time: "5 min",
      tag: "Test",
      desc: `Description ${i + 1}`,
    }));

  const setup = (postCount) => {
    return render(
      <BrowserRouter>
        <Posts posts={generateMockPosts(postCount)} />
      </BrowserRouter>
    );
  };

  test("displays correct number of posts for first page", () => {
    setup(10);
    const displayedPosts = screen.getAllByRole("link");
    expect(displayedPosts).toHaveLength(6);
  });

  test("calculates total pages correctly", () => {
    setup(13);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    const displayedPosts = screen.getAllByRole("link");
    expect(displayedPosts).toHaveLength(6);
    fireEvent.click(nextButton);
    const lastPagePosts = screen.getAllByRole("link");
    expect(lastPagePosts).toHaveLength(1);
  });

  test("handles exact multiple of posts per page", () => {
    setup(12);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    const displayedPosts = screen.getAllByRole("link");
    expect(displayedPosts).toHaveLength(6);
  });

  test("maintains post order during pagination", () => {
    setup(8);
    const firstPageTitles = screen
      .getAllByText(/Post \d+/)
      .map((el) => el.textContent);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    const secondPageTitles = screen
      .getAllByText(/Post \d+/)
      .map((el) => el.textContent);
    expect(firstPageTitles[0]).toBe("Post 1");
    expect(secondPageTitles[0]).toBe("Post 7");
  });

  test("handles single page of posts correctly", () => {
    setup(5); // Only 5 posts, less than postsPerPage

    const nextButton = screen.getByRole("button", { name: /next/i });
    const prevButton = screen.getByRole("button", { name: /previous/i });

    expect(nextButton).toBeDisabled(); // Should be disabled because there's no next page
    expect(prevButton).toBeDisabled(); // Should be disabled because there's no previous page

    const displayedPosts = screen.getAllByRole("link");
    expect(displayedPosts).toHaveLength(5); // All posts should be displayed on a single page
  });

  test("updates current page index correctly", () => {
    setup(12);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    const firstPagePosts = screen.getAllByRole("link");
    expect(firstPagePosts[0]).toHaveTextContent("Post 1");
  });
});
