import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/**
 * Unit tests for the revenue path (ProjectOS 01-Engineering/testing.md): the
 * form schemas, spam gates, CRM client and failure path. Pure functions and
 * Server Actions, so no browser and no framework harness.
 */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
