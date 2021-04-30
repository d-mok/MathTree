module.exports = {
    "setupFiles": ["./dist/dev/mathtree.js",],
    setupFilesAfterEnv: ["jest-extended", "./src/Math/Jest/JestExtend.js"],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "verbose": false,
    "silent": false
}