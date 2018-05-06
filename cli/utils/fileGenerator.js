const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const keywords = require('./../keywords.json');

module.exports = class FileGenerator {
    constructor(config) {
        this.files = config.files;
        this.include = _.pick(config, ['hasColor', 'hasStats']);
        this.keywords = keywords.keywords.sort().reverse();
        this.classes = keywords.classes.sort().reverse();
        this.others = keywords.others.sort().reverse();
        this.bools = keywords.bools.sort().reverse();
    }

    buildFiles() {
        this.files.forEach(file => {
            fs.readFile(path.join(__dirname, `./../${file}`), 'utf-8', (err, data) => {
                if (err) throw err;
                if (this.include.hasStats) this.buildStats(file, data);
                if (this.include.hasColor) data = this.buildHtml(data);
                fs.writeFile(path.join(__dirname, `./../${file}.html`), `<pre>${data}</pre>`, 'utf8', (err2) => {
                    if (err2) throw err2;
                    console.log('The file has been saved!');
                });
            });
        });
    }

    buildHtml(html)  {
        return html.replace(/((?:'|").*(?:'|"))/g, match => `<span style="color:green">${match}</span>`)
                   .replace(/(?<![a-zA-Z:])(?:#|\/\/)[^\r\n]*|\/\*[\s\S]*?\*\//ig, match => `<span style="color:green">${match}</span>`)
                   .replace(new RegExp(`(?<![a-zA-Z.])(${this.keywords.join('|')})(?![a-zA-Z])`, 'g'), '<span style="color:purple">$1</span>')
                   .replace(new RegExp(`(?<![a-zA-Z.])(${this.classes.join('|')})(?![a-zA-Z])`, 'g'), '<span style="color:#bab446">$1</span>')
                   .replace(new RegExp(`(?<!^)<(${this.others.join('|')})`, 'g'), '<span style="color:blue">$1</span>')
                   .replace(new RegExp(`(?<!^)(${this.bools.join('|')})`, 'g'), '<span style="color:orange">$1</span>');
    }

    buildStats(file, content)  {
        const keywords = this.keywords.concat(this.others,this.bools,this.classes);
        let stats = {
            occurences_of: {
                keywords: (content.match(new RegExp(`(?<![a-zA-Z.])(${keywords.join('|')})(?![a-zA-Z])`, 'g')) || []).length,
                count_per_keyword: {}, 
                numbers: (content.match(/[+-]?\d+(?:\.\d+)?/g) || []).length
            }
        };

        // Occurences counting -> Regex for each word (loop).
        keywords.forEach(keyword => {
            // Put in occurences at [keyword] -> occurences of keyword in content
            stats.occurences_of.count_per_keyword[keyword] = (content.match(new RegExp(`(?<![a-zA-Z.])${keyword}(?![a-zA-Z])`, 'g')) || []).length;
        });

        //console.log(stats);
        fs.writeFile(path.join(__dirname, `./../${file}_stats.json`), JSON.stringify(stats, undefined, 2), 'utf8', err => {
            if (err) throw err;
            console.log('Stats generated!')
        });
    }
}