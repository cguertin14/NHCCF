const FileGenerator = require('./utils/fileGenerator');

(() => {
    const command  = process.argv.slice(2),
          hasColor = command.includes('-color') || command.includes('/color'),
          hasStats = command.includes('-stats') || command.includes('/stats'),
          files    = command.filter(argv => argv.match(/^(?!.*(stats|color)).*$/i));

    new FileGenerator({ hasColor, hasStats, files }).buildFiles();
})();