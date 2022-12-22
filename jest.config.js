export default async () => {
  return {
    testPathIgnorePatterns: [
      "<rootDir>/src/client/",
      "<rootDir>/node_modules/",
    ],
  };
};
