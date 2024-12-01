import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import "@testing-library/jest-dom";
import RecentPosts from "../../components/RecentPosts";

// Mock window.innerWidth
const setWindowWidth = (width) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

const mockPosts = [
  {
    key: "1",
    thumb: "image1.jpg",
    title: "First Post",
    author: "Author 1",
    time: "5 min read",
    tag: "Tech",
    desc: "A".repeat(150),
  },
  {
    key: "2",
    thumb: "image2.jpg",
    title: "Second Post",
    author: "Author 2",
    time: "3 min read",
    tag: "Design",
    desc: "Short description",
  },
  {
    key: "3",
    thumb: "image3.jpg",
    title: "Third Post",
    author: "Author 3",
    time: "4 min read",
    tag: "Development",
    desc: "Medium length description here",
  },
  {
    key: "4",
    thumb: "image4.jpg",
    title: "Fourth Post",
    author: "Author 4",
    time: "6 min read",
    tag: "UI/UX",
    desc: "B".repeat(120),
  },
];

describe("RecentPosts Component", () => {
  const renderRecentPosts = (props = {}) => {
    return render(
      <BrowserRouter>
        <RecentPosts posts={mockPosts} {...props} />
      </BrowserRouter>
    );
  };

  test("renders SEO metadata correctly", () => {
    renderRecentPosts();
    const helmet = Helmet.peek();
    expect(helmet.title).toBe("Recent Blog Posts");
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "description",
          content: expect.any(String),
        }),
      ])
    );
  });

  test("handles desktop layout correctly", () => {
    setWindowWidth(1024);
    renderRecentPosts();
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
  });

  test("handles mobile layout correctly", () => {
    setWindowWidth(768);
    renderRecentPosts();
    const container = screen.getByRole("main");
    expect(container).toBeInTheDocument();
  });

  test("truncates long descriptions", () => {
    renderRecentPosts();
    const truncatedText = screen.getByText(/A{50}\.{3}/);
    expect(truncatedText).toBeInTheDocument();
  });

  test("displays all required post metadata", () => {
    renderRecentPosts();
    expect(screen.getByText("Author 1 • 5 min read")).toBeInTheDocument();
    expect(screen.getByText("Tech")).toBeInTheDocument();
  });

  test("returns null when insufficient posts", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { container } = render(
      <BrowserRouter>
        <RecentPosts posts={mockPosts.slice(0, 2)} />
      </BrowserRouter>
    );
    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test("applies correct layout for blog detail page", () => {
    renderRecentPosts({ isBlogDetailPage: true });
    const posts = screen.getAllByRole("link");
    expect(posts).toHaveLength(4);
  });

  test("creates correct navigation links", () => {
    renderRecentPosts();
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/detail/1");
    expect(links[1]).toHaveAttribute("href", "/detail/2");
  });
});
