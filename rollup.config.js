import resolve from '@rollup/plugin-node-resolve';
import ignore from 'rollup-plugin-ignore';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript'; // Omita se não estiver usando TypeScript
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };
export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ],

  plugins: [
    ignore(['**/*.stories.tsx', '**/*.stories.ts']),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
        exclude: ["**/*.stories.ts", "**/*.stories.tsx"]
    }), // Omita se não estiver usando TypeScript
    terser() // Minifica o código para produção
  ],
  external: id => id.includes('.stories.'), // Seu arquivo de entrada principal
};
