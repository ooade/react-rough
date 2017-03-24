import babel from 'rollup-plugin-babel';

let pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  useStrict: false,
  sourceMap: true,
  external: [
    'react'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers']
    })
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'cjs'
    },
    {
      dest: pkg.module,
      format: 'es'
    },
    {
      dest: pkg['umd:main'],
      format: 'umd',
      moduleName: 'ReactRough'
    }
  ]
};
