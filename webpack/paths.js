'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

const envPublicUrl = process.env.PUBLIC_URL;

function getPublicUrl(appPackageJson) {
  return envPublicUrl || require(appPackageJson).homepage;
}

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}


function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl ||
    (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}


// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp('build'),
  appIndexJs: resolveApp('src/app/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src/app'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths,
  testsSetup: resolveApp('src/setupTests.js'),
};
