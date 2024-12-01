export default {
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // Transform file JS, JSX, TS, dan TSX menggunakan Babel
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock file CSS
    "\\.(svg|png|jpg|jpeg|gif)$": "jest-transform-stub", // Mock file gambar
  },
};
