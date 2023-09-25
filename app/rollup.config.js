import terser from "@rollup/plugin-terser";

export default {
  input: "index.js",
  output: {
    file: "semaphore.min.js",
    format: "cjs",
  },
  plugins: [terser()],
};
