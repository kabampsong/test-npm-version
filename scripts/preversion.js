'use strict';

const fs = require('fs');

function preversion(argv = process.argv) {
	const fileContent = fs.readFileSync('./config/project.json', 'utf8');
	const versionRegex = /"project":\s*"(\d+\.\d+\.\d+)"/;
	const [, versionString] = versionRegex.exec(fileContent);

	let [major, minor, patch] = versionString.split('.')
		.map(x => parseInt(x, 10))
		.map(x => (Number.isNaN(x) ? 0 : x));

	switch (argv[2]) {
		case 'major':
			major += 1;
			minor = 0;
			patch = 0;
			break;
		case 'minor':
			minor += 1;
			patch = 0;
			break;
		case 'patch':
			patch += 1;
			break;
		default:
			console.log(`Current project version is ${versionString}`);
			console.log('Please add "patch", "major", "minor" if you wish to increament the project version number.');
			process.exit(-1);
	}

	const newString = `"project": "${major}.${minor}.${patch}"`;
	fs.writeFileSync('./config/project.json', versionRegex[Symbol.replace](fileContent, newString), 'utf8');
}

if (require.main === module) {
	preversion(process.argv);
}
