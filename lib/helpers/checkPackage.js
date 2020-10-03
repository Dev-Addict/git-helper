const inquirer = require('inquirer');

const packageCheckQuestions = require('../questions/packageCheckQuestions');

module.exports = async (result) => {
    console.log(result);
    const packageCheckQuestionsResult = await inquirer.prompt(packageCheckQuestions);
    return packageCheckQuestionsResult.isAgree;
};
