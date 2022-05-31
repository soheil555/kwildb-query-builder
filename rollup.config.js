import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
const config = [
  {
    input: "build/compiled/index.js",
    output: {
      file: "dist/kwildb-query-builder.js",
      format: "cjs",
      sourcemap: true,
    },
    external: ["kwildb", "knex", "@poppinss/utils"],
    plugins: [typescript()],
  },
  {
    input: "build/compiled/index.d.ts",
    output: {
      file: "dist/kwildb-query-builder.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
export default config;
