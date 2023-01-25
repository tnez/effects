import { expectType } from 'tsd'
import Effects from '.'

/**
 * Effects.Data
 * - insert
 * - update
 * - remove
 */
expectType<Promise<Effects.Data.DataRecord>>(Effects.Data.insert({ type: 'thing', version: '1.0', data: { foo: 'bar', baz: 'fizz' }}))
expectType<Promise<Effects.Data.DataRecord>>(Effects.Data.update('ID-1234-ABCD', { baz: 'new value' }))
expectType<Promise<void>>(Effects.Data.remove('ID-1234-ABCD'))

/**
 * Effects.Jobs
 * - enqueue
 * - dequeue
 * - update
 */
expectType<Promise<Effects.Jobs.Job>>(Effects.Jobs.enqueue({ name: 'build-trees', context: { id: '1234', numTrees: 4 } }))
expectType<Promise<Effects.Jobs.Job>>(Effects.Jobs.enqueue({ name: 'build-trees', runAfter: new Date('2024-01-01'), context: { id: '1234', numTrees: 4 } }))
expectType<Promise<Effects.Jobs.Job>>(Effects.Jobs.dequeue('JOB-ID-1234'))
expectType<Promise<Effects.Jobs.Job>>(Effects.Jobs.update('JOB-ID-1234', 'active'))
expectType<Promise<Effects.Jobs.Job>>(Effects.Jobs.update('JOB-ID-1234', 'processed'))
expectType<Promise<Effects.Jobs.Job>>(Effects.Jobs.update('JOB-ID-1234', 'failed'))

/**
 * Effects.Logs
 * - emit
 */
expectType<Promise<void>>(Effects.Logs.emit('🔥 As it was, so it was 🔥'))
