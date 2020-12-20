module.exports = {
    "setupFiles": ["./dist/edge.js",],
    setupFilesAfterEnv: ["./src/Math/Jest/JestExtend/JestExtend.js"],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "verbose": true,
    "silent": true
}