import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./test/vitest.setup.ts",
    exclude: [...configDefaults.exclude, "**/lib/**"],
  },
});
