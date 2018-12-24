import buble from 'rollup-plugin-buble';
import minify from 'rollup-plugin-babel-minify';
import path from 'path';
import resolve from '@seregpie/rollup-plugin-resolve';

import {main} from './package.json';

let globals = {
	'three': 'THREE',
};

export default {
	input: 'src/index.js',
	external: Object.keys(globals),
	sourceMap: true,
	output: {
		file: main,
		format: 'umd',
		name: path.basename(main, path.extname(main)),
		globals,
	},
	plugins: [
		resolve(),
		buble(),
		// minify({comments: false}),
	],
};
