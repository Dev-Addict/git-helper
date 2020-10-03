const {basename} = require('path');
const chalk = require('chalk');

module.exports = [
    {
        type: 'input',
        name: 'name',
        message: 'Name:',
        default: () => {
            return basename(process.cwd());
        },
        transformer: function (input) {
            if (input)
                if (/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(input))
                    return chalk.green(input);
                else
                    return chalk.red(input);
            return input;
        },
        validate(value) {
            if (/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(value))
                return true;
            return 'This is an invalid package name. Please try again.';
        }
    },
    {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: () => {
            return '1.0.0';
        },
        transformer: function (input) {
            if (input)
                if (/^(\d|[1-9]\d*)\.(\d|[1-9]\d*)\.(\d|[1-9]\d*)(-(0|[1-9A-Za-z-][0-9A-Za-z-]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(\.(0|[1-9A-Za-z-][0-9A-Za-z-]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?/.test(input))
                    return chalk.green(input);
                else
                    return chalk.red(input);
            return input;
        },
        validate(value) {
            if (/^(\d|[1-9]\d*)\.(\d|[1-9]\d*)\.(\d|[1-9]\d*)(-(0|[1-9A-Za-z-][0-9A-Za-z-]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(\.(0|[1-9A-Za-z-][0-9A-Za-z-]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?/.test(value))
                return true;
            return 'This is an invalid package version. Please try again.';
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'keywords',
        message: 'Keywords:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'homepage',
        message: 'Homepage:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'bugs.url',
        message: 'Bugs URL:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'bugs.email',
        message: 'Bugs Email:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: () => 'MIT',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'main',
        message: 'Main:',
        default: () => 'index.js',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    },
    {
        type: 'input',
        name: 'repository',
        message: 'Repository:',
        default: () => '',
        transformer: function (input) {
            if (input)
                return chalk.green(input);
            return input;
        }
    }
];
