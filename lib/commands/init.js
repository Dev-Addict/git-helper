const {basename, join} = require('path');
const {existsSync, unlinkSync, writeFileSync} = require('fs');
const beautify = require('json-beautify');
const inquirer = require('inquirer');
const chalk = require('chalk');

const agreementQuestion = [
    {
        type: 'confirm',
        name: 'isAgree',
        message: 'package.json file already exists; Are you sure you want to create a new one?',
        default: () => false
    }
];

const initQuestions = [
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

const packageAgreementQuestions = [
    {
        type: 'confirm',
        name: 'isAgree',
        message: 'Are you sure you want to create this package? or you want to try again?',
        default: () => true
    }
];

exports.init = async (args, dependencyManager) => {
    if (existsSync(join(process.cwd(), './package.json'))) {
        const agreementResults = await inquirer.prompt(agreementQuestion);

        if (!agreementResults.isAgree) {
            console.log(chalk.green('Successfully canceled the npm initialization'));
            return;
        }

        try {
            unlinkSync(join(process.cwd(), './package.json'));
            console.log(chalk.green('Successfully deleted package.json file'));
        } catch (err) {
            console.log(chalk.red(err.message));
            return;
        }
    }

    const initResults = await inquirer.prompt(initQuestions);
    initResults.bugs = {
        url: initResults['bugs.url'],
        email: initResults['bugs.email']
    };
    initResults.repository = {
        type: 'git',
        url: initResults['repository']
    };
    initResults.scripts = {};
    initResults.configs = {};
    initResults.dependencies = {};
    initResults.devDependencies = {};

    const initResultsJson = beautify(initResults, null, 4, 1);

    console.log(initResultsJson);
    const packageAgreementResults = await inquirer.prompt(packageAgreementQuestions);
    if (!packageAgreementResults.isAgree) {
        setTimeout(() => this.init(args, dependencyManager),0);
        return;
    }

    try {
        writeFileSync(join(process.cwd(), './package.json'), initResultsJson);
        console.log(chalk.green('Successfully created package.json file'));
    } catch (err) {
        console.log(chalk.red(err.message));
        return;
    }
};

exports.initError = () => {
    console.log(chalk.red(`You can't use both -i and --init flag in one command.`));
};
