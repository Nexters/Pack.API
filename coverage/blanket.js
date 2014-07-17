var path = require('path');
var srcDir = path.join(__dirname, '..', 'packages');

require('blanket')({
  pattern: srcDir
});
