/* eslint-disable @typescript-eslint/no-var-requires */
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const yaml = require('yaml')

const filter = require('../src')

const doPrivate = !process.env.SKIP_PRIVATE

const tests = fs.readdirSync(__dirname).filter((file) => {
  return fs.statSync(path.join(__dirname, file)).isDirectory() && (!file.startsWith('_') || doPrivate)
})

describe('Filter tests', () => {
  tests.forEach((test) => {
    describe(test, () => {
      it('should match expected output', (done) => {
        let options = {}
        let configFile = null
        try {
          // Load options.yaml
          configFile = path.join(__dirname, test, 'options.yaml')
          options = yaml.parse(fs.readFileSync(configFile, 'utf8'), { schema: 'core' })
        } catch (ex) {
          try {
            // Fallback to options.json
            configFile = path.join(__dirname, test, 'options.json')
            options = JSON.parse(fs.readFileSync(configFile, 'utf8'))
            // eslint-disable-next-line @typescript-eslint/no-shadow
          } catch (ex) {
            // No options found. options = {} will be used
          }
        }

        const defaultOptions = {}

        if (options.maxAliasCount) {
          defaultOptions.maxAliasCount = options.maxAliasCount
        }

        const input = yaml.parse(fs.readFileSync(path.join(__dirname, test, 'input.yaml'), 'utf8'), {
          ...defaultOptions,
          schema: 'core',
        })
        let readOutput = false
        let output = {}
        try {
          output = yaml.parse(fs.readFileSync(path.join(__dirname, test, 'output.yaml'), 'utf8'), {
            ...defaultOptions,
            schema: 'core',
          })
          readOutput = true
        } catch (ex) {}

        const result = filter.filter(input, options)
        if (!readOutput) {
          output = result
          fs.writeFileSync(path.join(__dirname, test, 'output.yaml'), yaml.stringify(result), 'utf8')
        }

        assert.deepStrictEqual(result, output)
        return done()
      })
    })
  })
})
