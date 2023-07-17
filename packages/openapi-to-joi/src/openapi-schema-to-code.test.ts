import path from 'path'
import openapiSchemaToCode from './openapi-schema-to-code'

describe('openapiSchemaToCode', function () {
  it('creates expected file', async function () {
    const actual = await openapiSchemaToCode(path.join(__dirname, 'fixtures', 'example1.json'))

    expect(actual).toMatchSnapshot()
  })
})
