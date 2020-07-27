import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { declaration, declarationDir, ...compilerOptions } = tsconfig.compilerOptions;

export default{
  input: 'src/index.ts',
  output: [
    { format: 'cjs', file: pkg.main },
    { format: 'es', file: pkg.module },
  ],
  external: '@popperjs/core',
  plugins: [
    typescript({
      tsconfig: false,
      ...compilerOptions
    })
  ]
};
