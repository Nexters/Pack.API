var path = require('path');
var srcDir = path.join(__dirname, '..', 'packages');
var exceptSrcDir = path.join(__dirname, '..', 'packages/**/**/tests/*.js')
//srcDir = ['*.js', 'test/**/*.js','!packages/**/server/tests/**', '!test/coverage/**', '!bower_components/**', 'packages/**/*.js', '!packages/**/**/tests/*.js','!packages/**/node_modules/**']
console.log(srcDir);
require('blanket')({
  pattern: srcDir,
  "data-cover-never": ["tests","system"]
});
