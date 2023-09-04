var fs = require('fs');
var path = require('path');
var packageJSON = require('../package.json');

Object.assign(packageJSON, {
	main: './index.js',
	types: './index.d.ts',
	files: undefined,
});
Object.assign(packageJSON.scripts, {
	test: 'cd .. && jest',
	build: 'tsc -p ../tsconfig.build.json && tscpaths -p ../tsconfig.build.json -s ../src -o .',
	format: 'echo Formatted',
	lint: 'echo Linted',
	prepublishOnly: 'npm run test && npm run lint',
	preversion: 'npm run lint',
	version: 'yarn build',
	postversion: 'git push && git push --tags',
});

fs.copyFileSync('./.npmrc', './dist/.npmrc');
fs.writeFileSync('./dist/package.json', JSON.stringify(packageJSON, null, 2), {
	encoding: 'utf-8',
});
