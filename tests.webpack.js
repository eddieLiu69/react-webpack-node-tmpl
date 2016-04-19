// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
var context = require.context('./app/tests', true, /.tsx?$/);
context.keys().forEach(context);
