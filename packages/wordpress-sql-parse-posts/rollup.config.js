import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import run from "@rollup/plugin-run";
import pkg from "./package.json";

const dev = process.env.ROLLUP_WATCH === "true";

export default [
  // browser-friendly UMD build
  // not need for now
  // {
  //   input: "src/index.ts",
  //   output: {
  //     name: "wordpressSqlParsePosts",
  //     file: pkg.browser,
  //     format: "umd",
  //   },
  //   plugins: [
  //     resolve(), // so Rollup can find `ms`
  //     typescript({ module: "CommonJS" }),
  //     commonjs({ extensions: [".js", ".ts"] }), // the ".ts" extension is required
  //   ],
  // },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.ts",
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      // not need for now
      // { file: pkg.module, format: "es" },
    ],
    plugins: [
      typescript({ module: "CommonJS" }),
      commonjs({ extensions: [".js", ".ts"] }), // the ".ts" extension is required
      dev && run(),
    ],
  },
];
