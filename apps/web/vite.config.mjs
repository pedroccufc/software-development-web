import { defineConfig, loadEnv, transformWithEsbuild } from "vite";
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [legacyJsx(), react({ jsxRuntime: "classic" })],
    define: {
      "import.meta.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL || "")
    },
    build: { outDir: "build" }
  };
});
