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
  Data.update('ID-1234-ABCD', { baz: 'new value' }),
)
expectType<Promise<void>>(Data.remove('ID-1234-ABCD'))
