import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

let pkg = require('./package.json');

export default {
	input: 'src/index.js',
	external: ['react', 'roughjs/dist/rough.umd'],
	plugins: [
		babel({
			exclude: 'node_modules/**'
		}),
		terser(),
		replace({
			exclude: 'node_modules/**',
			roughjs: 'roughjs/dist/rough.umd'
		})
	],
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
			exports: 'named'
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
			exports: 'named'
		},
		{
			name: 'react-rough',
			file: pkg.umd,
			format: 'umd',
			sourcemap: true,
			exports: 'named',
			globals: {
				react: 'react',
				'roughjs/dist/rough.umd': 'roughjs'
			}
		}
	]
};
