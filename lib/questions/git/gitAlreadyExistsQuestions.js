module.exports = [
    {
        type: 'confirm',
        name: 'isAgree',
        message: 'git already exists; Are you sure you want to create a new one?',
        default: () => false
    }
];
