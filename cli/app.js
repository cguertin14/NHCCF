const keywords = require('./keywords.json');
const FileGenerator = require('./utils/fileGenerator');

(() => {
    const command  = process.argv.slice(2),
          hasColor = command.includes('-color') || command.includes('/color'),
          hasStats = command.includes('-stats') || command.includes('/stats'),
          files    = command.filter(argv => argv.match(/^(?!.*(stats|color)).*$/i));

    // For debugging purposes.
    console.log('Args: ', command);
    console.log('Files: ', files);

    if (hasColor && hasStats)
        new FileGenerator(files).buildHtml().buildStats();
    else if (hasStats && !hasColor)
        new FileGenerator(files).buildStats();
    else if (!hasStats && hasColor)
        new FileGenerator(files).buildHtml();
    else if (!hasStats && !hasColor)
        throw new Error('You must provide at least one argument.')
})();