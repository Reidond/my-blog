import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import run from "@rollup/plugin-run";
import pkg from "./package.json";

const dev = process.env.ROLLUP_WATCH === "true";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: pkg.module, format: "es", sourcemap: true },
    ],
    plugins: [
      resolve(),
      typescript({ module: "CommonJS" }),
      commonjs({ extensions: [".js", ".ts"] }),
    ],
  },
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
    ],
    plugins: [
      typescript({ module: "CommonJS" }),
      commonjs({ extensions: [".js", ".ts"] }), // the ".ts" extension is required
      dev && run(),
    ],
  },
];
