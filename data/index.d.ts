import type { DocumentMetadata, DocumentMetadataKeys } from '../common'

export type Document = {
  /**
   * Data payload
   * @example `{ foo: 'baz', fizz: 'buzz', answer: 42 }
   */
  data: Record<string, unknown>
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  key_1?: string
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  key_2?: string
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  key_3?: string
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  key_4?: string
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
} & DocumentMetadata

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
export function insert(
  record: Omit<Document, DocumentMetadataKeys>,
): Promise<Document>

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
export function update(
  id: string,
  data: Record<string, unknown>,
): Promise<Document>

/**
 * Remove the specified record from the datastore
 * @param id
 */
export function remove(id: string): Promise<void>

export type Data = {
  insert: typeof insert
  update: typeof update
  remove: typeof remove
}

export default Data
