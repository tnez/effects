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
    text: 'content for full-text search',
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
      sk2: { eq: 'excalibur' },
      sk3: { neq: 'inner' },
      version: { gte: '2.2' },
      createdAt: { gt: new Date() },
    },
    orderBy: [{ sk1: 'ascending' }, { createdAt: 'descending' }],
    take: 50,
    after: 'some-valuez:1970-01-01T00:23:24',
  }),
)
expectType<
  Promise<{ documents: Data.Document[]; pagination: Data.Pagination }>
>(
  Data.query({
    type: 'note',
    text: 'some text in body of note',
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
    {
      sk2: 'new value',
      sk3: 'another new value',
      text: 'updating full-text here',
    },
  ),
)

/**
 * Remove
 */
expectType<Promise<void>>(Data.remove('ID-1234-ABCD'))
