import { expectType } from 'tsd'
import * as Data from '.'

/**
 * Insert
 */
expectType<Promise<Data.Document>>(
  Data.insert({
    type: 'thing',
    version: '1.0',
    data: { foo: 'bar', baz: 'fizz' },
  }),
)
expectType<Promise<Data.Document>>(
  Data.insert({
    type: 'thing',
    version: '1.0',
    data: { foo: 'bar', baz: 'fizz' },
    sk1: 'bar',
    sk2: 'fizz',
  }),
)
expectType<Promise<Data.Document>>(
  Data.insert({
    type: 'thing',
    version: '1.0',
    data: { foo: 'bar', baz: 'fizz' },
    sk1: 'bar',
    sk2: 'fizz',
    sk3: 'another',
    sk4: 'thing',
  }),
)

/**
 * Query
 */
expectType<
  Promise<{ documents: Data.Document[]; pagination: Data.Pagination }>
>(Data.query({ type: 'minimal' }))
expectType<
  Promise<{ documents: Data.Document[]; pagination: Data.Pagination }>
>(
  Data.query({
    type: 'thing',
    where: {
      sk1: { gt: 'some-value' },
      sk2: { eq: ['excalibur', 'round-table'] },
      sk3: { contains: ['inner'] },
      version: { gte: '2.2' },
      createdAt: { gt: '1970-01-01T00:00:00' },
    },
    orderBy: [{ sk1: 'ascending' }, { createdAt: 'descending' }],
    take: 50,
    after: 'some-valuez:1970-01-01T00:23:24',
  }),
)

/**
 * Update
 */
expectType<Promise<Data.Document>>(
  Data.update('ID-1234-ABCD', { baz: 'new value' }),
)
expectType<Promise<Data.Document>>(
  Data.update(
    'ID-1234-ABCD',
    { baz: 'new value' },
    { sk2: 'new value', sk3: 'another new value' },
  ),
)

/**
 * Remove
 */
expectType<Promise<void>>(Data.remove('ID-1234-ABCD'))
