import yargs from 'yargs';
import keywords from './keywords.json';

(() => {    
    const argv = yargs
        .command('color', 'Add color to keywords in specified file')
        .command('stats', 'Generate a statistics file concerning the specified file')
        .help()
        .argv;    
    
    let command = process.argv;
    console.log('Command: ', command);
    console.log('Yargs: ', argv);    
    
    
    switch (command) {
        case 'color': {
            break;
        }
        case 'stats': {
            break;
        }
        default: console.log('Command not recognized'); break;
    }
})();