#!/usr/bin/env node
/* eslint-disable no-console */
import openapiSchemaToCode from '@invivodf/module-openapi-to-joi/dist/openapi-schema-to-code'
import { execSync } from 'child_process'
import * as fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const temp = '_temp'

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <path> [options]')
  .showHelpOnFail(false)

  // Demand path
  .demandCommand(1)

  .option('o', {
    alias: 'outputDir',
    demandOption: true,
    describe: 'The output file or directory',
    default: 'dist',
    type: 'string'
  }).argv as unknown as { _: string[]; outputDir: string }

const run = async () => {
  const schemaPath = argv._[0]
  const { outputDir } = argv

  clean(outputDir)
  bundleJSON(schemaPath)
  generateTypes()
  validateOpenAPI()
  await generateJoi()
  build()
  copyOpenApi(outputDir)
  cleanBuild()
}

function clean(outputDir: string) {
  execSync(`rimraf ${temp} ${outputDir}`)
}

function bundleJSON(schemaPath: string) {
  console.log('bundle source files')
  execSync(`swagger-cli bundle ${schemaPath} --outfile ${temp}/openapi.json`)
}

function generateTypes() {
  console.log('generate types from openapi')
  execSync(
    `swagger-typescript-api -p ${temp}/openapi.json -o ${temp}/ -n index.ts --no-client --extract-request-params --route-types`
  )
}

async function generateJoi() {
  console.log('generate joi')
  const joiSchema = await openapiSchemaToCode(`${temp}/openapi.json`)
  await fs.promises.writeFile(`${temp}/joi-schema.js`, joiSchema, 'utf-8')
}

function validateOpenAPI() {
  console.log('validate result')
  let validationOutput: Buffer
  try {
    validationOutput = execSync(`spectral lint ${temp}/openapi.json --ruleset ${__dirname}/../.spectral.yaml`)
    console.log(validationOutput.toString())
  } catch (err: unknown) {
    console.log('output', err)
    const { stdout } = err as { stdout: Buffer }
    console.log('stdout', stdout.toString())
    throw 'Validation failed'
  }
}

function build() {
  console.log('build result')
  execSync('tsc --build --force tsconfig.json')
}

function copyOpenApi(outputDir: string) {
  execSync(`copyfiles -f './${temp}/openapi.json' './${outputDir}/'`)
}

function cleanBuild() {
  execSync(`rimraf ${temp} `)
}

run().catch(e => console.error(e))
