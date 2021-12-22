module.exports = {
    preset: "ts-jest/presets/default-esm",
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    // "setupFiles": ["./dist/dev/mathtree.js",],
    setupFiles: ["./src/index.ts",],
    setupFilesAfterEnv: ["jest-extended/all", "./src/Math/Jest/JestExtend.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    verbose: false,
    silent: false,
    testEnvironment: "jsdom"
};


