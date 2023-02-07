import { expectType } from 'tsd'
import * as Data from '.'

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
expectType<Promise<void>>(Data.remove('ID-1234-ABCD'))
