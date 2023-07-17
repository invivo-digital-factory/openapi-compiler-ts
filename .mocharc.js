'use strict'

const path = require('path')

const isCoverageEnabled = !!(process.env.NYC_PARENT_PID || process.env.NYC_PROCESS_ID)

module.exports = {
  color: true,
  recursive: true,
  require: ['ts-node/register'],
  timeout: 60000,
  exclude: ['**/*.d.ts'],
  ui: 'bdd',
  reporter: isCoverageEnabled ? 'mocha-multi-reporters' : 'spec',
  reporterOptions: isCoverageEnabled ? { configFile: '.junit.json' } : {},
  watchExtensions: ['ts'],
  extension: ['ts'],
  package: './package.json',
  spec: ['src/**/*.spec.*', 'test/test.js']
}
