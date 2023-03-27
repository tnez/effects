import { configure } from '.'
import { describe, expect, test, vi } from 'vitest'
import type { Schema, Document, ClientInterface } from './types'

type Foo = {
  source: 'one' | 'two' | 'three'
  headline: string
}

const createMockClient = (): ClientInterface => ({
  insert: vi.fn(),
  get: vi.fn(),
  list: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
})

describe('data interface', () => {
  test('configure should work as expected', () => {
    // Given...
    const client = createMockClient()
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const FooSchema: Schema<Foo> = {
      name: 'foo',
      parse: (data) => ({
        source: 'one',
        headline: 'There was a thing that once happened.',
      }),
      index: {
        encode: (data) => ({
          sk1: data.source,
          text: data.headline,
        }),
        decode: {
          sk1: { alias: 'source', description: 'Partition entities by source' },
        },
      },
      version: '1.0.0',
    }

    // When...
    const data = configure({
      client,
      schemas: [FooSchema],
    })

    // Then...
    expect(data.foo.get)
  })
})
