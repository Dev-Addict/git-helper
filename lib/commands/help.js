const chalk = require('chalk');
const figlet = require('figlet');

const commands = {
    '--help': 'show all the commands you can use with GitHelper',
    '--init': 'initialize npm and create git repository and push it to github'
};

exports.help = () => {
    console.log(chalk.cyan(figlet.textSync('GitHelper by DevAddict')));
    console.log(chalk.blue('Git Repository: https://github.com/Dev-Addict/git-helper'));
    console.log();
    console.log(chalk.bold.italic('\tCommands:'));
    for (let i in commands)
        console.log(chalk.bold(`\t\t${i}:`), `\t\t${commands[i]}`);
};

exports.helpError = () => {
    console.log(chalk.red(`${process.argv.slice(3).join(',')} aren't valid arguments for --help flag. if you need help just use --help flag or use npm or github page.`));
};
