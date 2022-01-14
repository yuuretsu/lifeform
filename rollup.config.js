import { terser } from "rollup-plugin-terser";
import { nodeResolve } from '@rollup/plugin-node-resolve';


const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/index.js",
  output: {
    file: "./public/build/bundle.js",
    format: 'iife',
    name: "app"
  },
  plugins: [
    production && terser({ format: { comments: false } }),
    nodeResolve(),
  ],
};
