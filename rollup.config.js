import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

let pkg = require('./package.json');

export default {
  entry: 'src/index.js',
  useStrict: false,
  sourceMap: true,
  plugins: [
    babel(babelrc())
  ],
  targets: [
    {
      dest: pkg.main,
      format: 'cjs'
    },
    {
      dest: pkg.module,
      format: 'es',
    },
    {
      dest: pkg['umd:main'],
      format: 'umd',
      moduleName: 'fonsole'
    }
  ]
};
