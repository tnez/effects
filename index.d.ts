export default Effects

declare namespace Effects {
  interface RecordMetadata {
    /**
     * Timestamp representing when this record was created.
     */
    createdAt: Date
    /**
     * Unique identifier of the record
     * @example `OID-ABCD-1234`
     */
    id: string
    /**
     * Timestamp representing the last time this record was updated. When first created, this will match the `createdAt` timestamp.
     */
    updatedAt: Date
  }
  type RecordMetadataKeys = 'createdAt' | 'id' | 'updatedAt'

  namespace Data {
    interface DataRecord extends RecordMetadata {
      /**
       * Data payload
       * @example `{ foo: 'baz', fizz: 'buzz', answer: 42 }
       */
      data: Record<string, unknown>
      /**
       * Identifies the _type_ of record.
       * @example 'user'
       * @example 'order'
       */
      type: string
      /**
       * Specifices the schema version of the data payload of this record.
       * @example '1.0'
       */
      version: string
    }

    /**
     * Insert a record into the datastore
     * @param record
     * @example
     * ```ts
     * const { id } = await data.insert({
     *   type: 'user',
     *   version: '1.0',
     *   data: JSON.stringify({
     *     email: 'user@example.com',
     *     tags: ['beta', 'priority'],
     *   })
     * })
     * ```
     */
    function insert(
      record: Omit<DataRecord, RecordMetadataKeys>,
    ): Promise<DataRecord>

    /**
     * Update the data property of the given record, identified by the specified ID.
     * The update is performed by merging the existing data property with new data provided.
     * @param id
     * @param data
     *
     * @example
     * ```ts
     * const updatedRecord = await data.update('ID-1234', { baz: 'new value' })
     * console.log(updatedRecord) //=> { id: 'ID-1234', data: JSON.stringify({ foo: 'old value', baz: 'new value' })}
     * ```
     */
    function update(
      id: string,
      data: Record<string, unknown>,
    ): Promise<DataRecord>

    /**
     * Remove the specified record from the datastore
     * @param id
     */
    function remove(id: string): Promise<void>
  }

  namespace Jobs {
    interface Job extends RecordMetadata {
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
    }

    interface JobFilter {
      name?: Job['name']
    }

    function enqueue(
      job: Omit<Job, RecordMetadataKeys | 'status' | 'runAfter'> &
        Pick<Partial<Job>, 'runAfter'>,
    ): Promise<Job>
    function dequeue(id: string): Promise<Job>
    function update(id: string, status: Job['status']): Promise<Job>
  }

  namespace Logs {
    /**
     * Emit a log
     * @param body
     */
    function emit(body: string): Promise<void>
  }
}
