import fs from 'fs';
import path from 'path';

/**
 * nodejs 加载 .env
 * @author LiQingSong
 */
export function setNodeEnv(NODE_ENV: string, envFile: string = path.resolve(__dirname, '../../.env')) {

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  const dotenvFiles = [
      `${envFile}.${NODE_ENV}.local`,
      `${envFile}.${NODE_ENV}`,
      `${envFile}.local`,
      envFile,
  ].filter(Boolean);

  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach(dotenvFile => {
      if (dotenvFile && fs.existsSync(dotenvFile)) {
        require('dotenv-expand')(
          require('dotenv').config({
            path: dotenvFile,
          })
        );
      }
  });
}