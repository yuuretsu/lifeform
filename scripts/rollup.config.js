import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from "@rollup/plugin-typescript";


const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/index.ts",
  output: {
    file: "./public/build/bundle.js",
    format: 'iife',
    name: "app"
  },
  plugins: [
    production && terser({ format: { comments: false } }),
    nodeResolve(),
    typescript()
  ],
};
