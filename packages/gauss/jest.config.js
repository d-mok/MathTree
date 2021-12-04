module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all"],
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/lib/"]
};