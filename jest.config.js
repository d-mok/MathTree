module.exports = {
    preset: "ts-jest",
    // "setupFiles": ["./dist/dev/mathtree.js",],
    "setupFiles": ["./src/index.ts",],
    setupFilesAfterEnv: ["jest-extended", "./src/Math/Jest/JestExtend.ts"],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "verbose": false,
    "silent": false
};



// module.exports = {
//     preset: "ts-jest",
//     "setupFilesAfterEnv": ["jest-extended"],
//     testEnvironment: "node",
//     modulePathIgnorePatterns: ["<rootDir>/lib/"]


// };