import { OpenAPIV3_1 } from 'openapi-types'

type Options = {
  flags?: string[]
  flagValues?: string[]
  checkTags?: boolean
  inverse?: boolean
  valid?: boolean
  strip?: boolean
  overrides?: string[]
}

type Openapi = OpenAPIV3_1.Document

export { Options, Openapi }
