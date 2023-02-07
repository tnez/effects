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
    key_1: 'bar',
    key_2: 'fizz',
  }),
)
expectType<Promise<Data.Document>>(
  Data.insert({
    type: 'thing',
    version: '1.0',
    data: { foo: 'bar', baz: 'fizz' },
    key_1: 'bar',
    key_2: 'fizz',
    key_3: 'another',
    key_4: 'thing',
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
      key_1: { gt: 'some-value' },
      key_2: { eq: ['excalibur', 'round-table'] },
      key_3: { contains: ['inner'] },
      version: { gte: '2.2' },
      createdAt: { gt: '1970-01-01T00:00:00' },
    },
    orderBy: [{ key_1: 'ascending' }, { createdAt: 'descending' }],
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
    { key_2: 'new value', key_3: 'another new value' },
  ),
)

/**
 * Remove
 */
expectType<Promise<void>>(Data.remove('ID-1234-ABCD'))
