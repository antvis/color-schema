import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/color-palette-json-schema.min.js',
      name: 'color-palette-json-schema',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [resolve(), typescript(), uglify()],
  },
];
