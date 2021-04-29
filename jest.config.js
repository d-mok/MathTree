module.exports = {
    "setupFiles": ["./dist/dev/mathtree.js",],
    setupFilesAfterEnv: ["./src/Math/Jest/JestExtend.js"],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "verbose": false,
    "silent": false
}