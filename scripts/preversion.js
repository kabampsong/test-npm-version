'use strict';

const fs = require('fs');

function syncProjectVersion() {
	const { version: packgeVersion } = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
	const fileContent = fs.readFileSync('./config/project.json', 'utf8');
	const versionRegex = /"project":\s*"(\d+\.\d+\.\d+)"/;
	const newProjectVersionString = `"project": "${packgeVersion}"`;
	fs.writeFileSync('./config/project.json', versionRegex[Symbol.replace](fileContent, newProjectVersionString), 'utf8');
}

if (require.main === module) {
	syncProjectVersion(process.argv);
}
