type ZodSchema<T = any> = T

type IndexMapper<T = {}> = (data: T) => string
type Index<T = {}> = {
  sk1?: { alias: string, mapper: IndexMapper<T> }
  sk2?: { alias: string, mapper: IndexMapper<T> }
  sk3?: { alias: string, mapper: IndexMapper<T> }
  sk4?: { alias: string, mapper: IndexMapper<T> }
  text?: { alias: string, mapper: IndexMapper<T> }
}

type Indices<T = {}> = Record<'sk1' | 'sk2' | 'sk3' | 'sk4' | 'text', { alias: string, mapper: (data: T) => string) }>



type Entity<T = {}> = {
  type: string
  version: string
  indices: Index<T>[]
  data: T
}
type Schema = ZodSchema<Entity>
type Config = {
  client: any
  schemas: Schema[]
}

type EntityConfig = {
  schema: Schema
  type: string
}

function register(schemas: Schema[]) {
  return schemas.map((schema) => {})
}

function configure(config: Config): Interface {}

const TopicSchema: Schema = {}
const UserSchema: Schema = {}

const data = configure([
  TopicSchema,
  UserSchema,
])

// data.user.insert(data)
// data.topic.get('id')
// data.topic.list({
  where: {},
  orderBy: [],
  take: 100,
  after: 'cursor',
})
// data.user.update('id')
// data.user.remove('id', data)

data.user.query().where({ state: 'active' }).take(100).after('ABCD-1234').run()
  where: {
    state: { eq: 'active' },
    source: { neq: 'twitter' },
    version: { gte: '1.0' },
  },
  orderBy: [
    { source: 'ascending' },
    { createdAt: 'descending' },
  ],
  take: 100,
  after: 'ABCD-1234',
})
