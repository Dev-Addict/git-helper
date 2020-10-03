module.exports = agreementQuestion = [
    {
        type: 'confirm',
        name: 'isAgree',
        message: 'package.json file already exists; Are you sure you want to create a new one?',
        default: () => false
    }
];
