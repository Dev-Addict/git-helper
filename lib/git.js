const simpleGit = require('simple-git');

const git = simpleGit({
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6
});

module.exports = git;
