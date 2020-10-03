const {existsSync, readdirSync, statSync, unlinkSync, rmdirSync} = require("fs");
const chalk = require('chalk');

module.exports = (path) => {
    if (existsSync(path)) {
        const files = readdirSync(path);

        if (files.length > 0) {
            files.forEach((filename) => {
                if (statSync(path + "/" + filename).isDirectory()) {
                    this(path + "/" + filename);
                } else {
                    unlinkSync(path + "/" + filename);
                }
            });
            rmdirSync(path);
        } else
            rmdirSync(path);
    } else
        throw new Error('Directory path not found.');
};
