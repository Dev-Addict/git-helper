const inquirer = require('inquirer');

const packageCheckQuestions = require('../../questions/package/packageCheckQuestions');

module.exports = async (result) => {
    console.log(result);
    const packageCheckQuestionsResult = await inquirer.prompt(packageCheckQuestions);
    return packageCheckQuestionsResult.isAgree;
};
