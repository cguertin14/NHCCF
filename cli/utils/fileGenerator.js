const fs = require('fs');

module.exports = class FileGenerator {
    constructor(files) {
        this.files = files;
    }

    buildHtml() {
        console.log('Html');
        return this;
    }

    buildStats() {
        console.log('Stats');
    }
}