'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var OfflinePlugin = require('offline-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (env) => {
  const mode = env.mode;
  const isDevelopment = mode === 'development';
  const isProduction = mode === 'production';
  const isTest = mode === 'test';
  const isTypescript = fs.existsSync(resolveApp('tsconfig.json'));

  let entry;
  let outputFile;
  let target = 'web';
  if (isProduction) { // Production.
    ['js', 'ts'].filter((ext) =>
      fs.existsSync(resolveApp(`./src/index.${ext}`))
    ).forEach((ext) => {
      entry = `./src/index.${ext}`;
    });
    outputFile = 'index.js';
  } else if (isDevelopment) { // Development.
    ['js', 'ts'].filter((ext) =>
      fs.existsSync(resolveApp(`./test/index.${ext}`))
    ).forEach((ext) => {
      entry = `./test/index.${ext}`;
    });
    outputFile = 'index.js';
  } else if (isTest) { // Test.
    // Create an entry point for each .mocha.js file.
    fs.readdirSync('./test/')
        .filter((file) => file.substr(-9) === '.mocha.js')
        .forEach((file) => {
          const entryName = file.replace(/\.mocha\.js/i, '');
          if (!entry) entry = {};
          entry[entryName] = `./test/${file}`;
        });
    outputFile = '[name].mocha.js';
    target = 'node';
  }

  return {
    target,
    mode: isProduction ? 'production' : 'development',
    entry: entry,
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    output: {
      path: isProduction ? resolveApp('dist') : resolveApp('build'),
      publicPath: isProduction ? '/dist/' : '/build/',
      filename: outputFile,
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    resolve: {
      alias: {
        'blockly': resolveApp('node_modules/blockly'),
      },
      extensions: ['.ts', '.js']
          .filter((ext) => isTypescript || !ext.includes('ts')),
    },
    module: {
      rules: [
        // Run the linter.
        {
          test: /\.(js|mjs|ts)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                formatter: 'stylish',
                emitWarning: true,
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                useEslintrc: false,
                baseConfig: {
                  extends: [require.resolve('@blockly/eslint-config')],
                },
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: [resolveApp('./src/'), resolveApp('./test/')],
        },
        // Run babel to compile both JS and TS.
        {
          test: /\.(js|mjs|ts)$/,
          exclude: /(node_modules|build|dist)/,
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              require.resolve('@babel/preset-env'),
              isTypescript && require.resolve('@babel/preset-typescript'),
            ].filter(Boolean),
            compact: isProduction,
          },
        },
      ],
    },
    plugins: [
      new OfflinePlugin({appShell: '/', publicPath: '/Blockly-test', autoUpdate: 1000 * 60 * 60 * 5, externals: ['/index.html', '/dist/index.js']}),
      // Typecheck TS.
      isTypescript &&
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: resolveApp('node_modules'),
        }),
        async: isDevelopment,
        useTypescriptIncrementalApi: true,
        checkSyntacticErrors: true,
        tsconfig: resolveApp('tsconfig.json'),
        reportFiles: [
          '**',
        ],
        silent: true,
      }),
      // canvas should only be required by jsdom if the 'canvas' package is
      // installed in package.json. Ignoring canvas require errors.
      isTest && new webpack.IgnorePlugin(/canvas$/),
    ].filter(Boolean)
  };
};
