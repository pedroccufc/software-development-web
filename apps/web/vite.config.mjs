import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

// Existing JSX lives in .js files. Preserve paths during the tooling migration.
function legacyJsx() {
  return {
    name: "sigru-jsx-in-js",
    enforce: "pre",
    async transform(code, id) {
      if (!/\/src\/.*\.js(?:\?|$)/.test(id)) return null;
      return transformWithEsbuild(code, id, {
        loader: "jsx",
        jsx: "transform",
        jsxFactory: "React.createElement",
        jsxFragment: "React.Fragment"
      });
    }
  };
}

export default defineConfig({
  plugins: [legacyJsx(), react({ jsxRuntime: "classic" })],
  build: { outDir: "build" }
});
