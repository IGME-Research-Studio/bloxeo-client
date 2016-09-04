var path = require('path');

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

module.exports = {
  appBuild: resolveOwn('./build'),
  appHtml: resolveOwn('./src/index.html'),
  appPackageJson: resolveOwn('./package.json'),
  appSrc: resolveOwn('./src'),
  appNodeModules: resolveOwn('./node_modules'),
  ownNodeModules: resolveOwn('./node_modules')
}
