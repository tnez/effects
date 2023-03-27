import type { ClientInterface, Document, Schema } from './types'

export type Config = {
  client: ClientInterface
  schemas: Schema<T extends unknown>[]
}

export function configure({ client, schemas }: Config) {
  const dataInterface: Record<string, ClientInterface<Document>> = {}

  for (const schema of schemas) {
    dataInterface[schema.name] = {
      async insert(data: unknown) {
        const document = schema.parse(data)
        const indices = schema.index.encode(document)
        const { id } = await client.insert({
          type: schema.name,
          version: schema.version,
          data: document,
          ...indices,
        })
        return { id }
      },
      async get(id: string) {
        const document = await client.get(id)
        return schema.parse(document)
      },
      async list() {
        throw new Error('Not implemented')
      },
      async update() {
        throw new Error('Not implemented')
      },
    }
  }

  return dataInterface
}
