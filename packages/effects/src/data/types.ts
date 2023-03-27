export type ClientInterface<T = Document> = {
  insert: (data: unknown) => Promise<{ id: string }>
  get: <T extends Document>(id: string) => Promise<T>
  list: <T extends Document>() => Promise<T[]>
  remove: (id: string) => Promise<{ ok: true }>
  update: <T extends Document>(data: unknown) => Promise<T>
}

export type Document = {
  id: string
  type: string
  version: string
  sk1: string
  sk2: string
  sk3: string
  sk4: string
  text: string
  data: Record<string, unknown>
} & DocumentMetadata

export type DocumentMetadata = {
  createdAt: string
  updatedAt: string
}

export type Pagination = {
  nextCursor: string | null
}

export type Schema<T> = {
  name: string
  description?: string
  parse: (data: unknown) => T
  index: {
    encode: (data: T) => Partial<{
      sk1: string
      sk2: string
      sk3: string
      sk4: string
      text: string
    }>
    decode: Partial<{
      sk1: { alias: string; description: string }
      sk2: { alias: string; description: string }
      sk3: { alias: string; description: string }
      sk4: { alias: string; description: string }
    }>
  }
  version: string
}
