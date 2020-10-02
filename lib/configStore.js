const ConfigStore = require('configstore');

const packageJson = require('../package.json');

const config = new ConfigStore(packageJson.name, {dependencyManager: 'npm'});

module.exports = config;
