'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = path.join(__dirname, "../../../")

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);


function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
  dirSrc: resolveApp('.'),
  nodePaths: nodePaths,
  nodeModules: resolveApp('node_modules'),
  appSrc: resolveApp('src/app'),
  mainSrc: resolveApp('src/main'),
  assetsSrc: resolveApp('src/assets'),
  appIndexJs: resolveApp('src/app/index.js'),
  mainIndexJs: resolveApp('src/main/index.js'),
  extensions: resolveApp('extensions'),
  appBuild: resolveApp('build'),
  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  dbMigrations: resolveApp('src/db/migrations')
};
