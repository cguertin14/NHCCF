const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const keywords = require('./../keywords.json');

module.exports = class FileGenerator {
    constructor(config) {
        this.files = config.files;
        this.include = {
            withColor: config.hasColor,
            withStats: config.hasStats
        };
        
        this.keywords = keywords.keywords.sort().reverse();
        this.classes  = keywords.classes.sort().reverse();
        this.others   = keywords.others.sort().reverse();
        this.symbols  = keywords.symbols.sort().reverse();
    }

    buildFiles() {
        this.files.forEach(file => {
            fs.readFile(path.join(__dirname,`./../${file}`), 'utf-8', (err, data) => {
                if (err) throw err;
                if (this.include.withColor) {
                    data = this.buildHtml(data);
                }
                fs.writeFile(path.join(__dirname,`./../${file}.html`), `<pre>${data}</pre>`, 'utf8', (err2) => {
                    if (err2) throw err2;
                    console.log('The file has been saved!');
                });
            });
        });

        if (this.include.withStats)
            this.buildStats();
    }

    buildHtml(html) {
        return html.replace(/((?:'|").*(?:'|"))/g, match => `<span style="color:green">${match}</span>`)
                   .replace(/(?<![a-zA-Z:])(?:#|\/\/)[^\r\n]*|\/\*[\s\S]*?\*\//ig, match => `<span style="color:green">${match}</span>`)
                   .replace(new RegExp(`(?<![a-zA-Z.])(${this.keywords.join('|')})(?![a-zA-Z])`, 'g'), '<span style="color:purple">$1</span>')
                   .replace(new RegExp(`(?<![a-zA-Z.])(${this.classes.join('|')})(?![a-zA-Z])`, 'g'), '<span style="color:#bab446">$1</span>')
                   .replace(new RegExp(`(?<!^)<(${this.others.join('|')})`, 'g'), '<span style="color:blue">$1</span>')
                   .replace(new RegExp(`(?<!^)(${this.symbols.join('|')})`, 'g'), '<span style="color:orange">$1</span>');
    }

    buildStats() {
        console.log('Stats');
    }
}