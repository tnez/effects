import { expectType } from 'tsd'
import * as Jobs from '.'

expectType<Promise<Jobs.Job>>(
  Jobs.enqueue({
    name: 'build-trees',
    context: { id: '1234', numTrees: 4 },
  }),
)
expectType<Promise<Jobs.Job>>(
  Jobs.enqueue({
    name: 'build-trees',
    runAfter: new Date('2024-01-01'),
    context: { id: '1234', numTrees: 4 },
  }),
)
expectType<Promise<Jobs.Job>>(Jobs.dequeue('JOB-ID-1234'))
expectType<Promise<Jobs.Job>>(Jobs.update('JOB-ID-1234', 'active'))
expectType<Promise<Jobs.Job>>(Jobs.update('JOB-ID-1234', 'processed'))
expectType<Promise<Jobs.Job>>(Jobs.update('JOB-ID-1234', 'failed'))
