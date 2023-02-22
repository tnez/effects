import type { DocumentMetadata, DocumentMetadataKeys } from '../common'

export type Job = {
  /**
   * Context required for the job. Likely will be serialized as JSON when stored.
   * @example `{ productId: 'PID-1234-ABCD', n: 5, tags: ['green', 'yo-yo'] }
   */
  context: Record<string, unknown>
  /**
   * Name of the job. This will be used to identify the propper handler.
   * @example `update-related-products`
   */
  name: string
  /**
   * Wait until after this timestmap to run. Defaults to current timestamp.
   */
  runAfter: Date
  /**
   * Status of the job
   */
  status: 'queued' | 'active' | 'processed' | 'failed'
} & DocumentMetadata

/**
 * Add a job to the queue.
 */
export function enqueue(
  job: Omit<Job, DocumentMetadataKeys | 'status' | 'runAfter'> &
    Pick<Partial<Job>, 'runAfter'>,
): Promise<Job>

/**
 * Remove a job from the queue.
 */
export function dequeue(id: string): Promise<Job>

/**
 * Update the properties of a given job in the queue.
 */
export function update(id: string, status: Job['status']): Promise<Job>

export type Jobs = {
  enqueue: typeof enqueue
  dequeue: typeof dequeue
  update: typeof update
}

export default Jobs
