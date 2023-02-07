import type {
  DocumentMetadata,
  DocumentMetadataKey,
  Pagination as _Pagination,
} from '../common'

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

export type Pagination = _Pagination

type DocumentSearchKey = 'key_1' | 'key_2' | 'key_3' | 'key_4'
type DocumentTimestampKey = 'createdAt' | 'updatedAt'
type DocumentVersionKey = 'version'

type DocumentOrderKey = DocumentSearchKey | 'createdAt' | 'updatedAt'
type DocumentOrderTerm = Partial<
  Record<DocumentOrderKey, 'ascending' | 'descending'>
>
type DocumentOrderClause = DocumentOrderTerm[]

type WhereTerm =
  | { contains: string }
  | { contains: string[] }
  | { eq: string }
  | { eq: string[] }
  | { gt: string }
  | { gte: string }
  | { is: null }
  | { lt: string }
  | { lte: string }
type Negate<T> = { not: T }
type DocumentWhereKey =
  | DocumentSearchKey
  | DocumentTimestampKey
  | DocumentVersionKey
type DocumentWhereClause = Partial<
  Record<DocumentWhereKey, WhereTerm | Negate<WhereTerm>>
>

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
  record: Omit<Document, DocumentMetadataKey>,
): Promise<Document>

/**
 * Query data for a list of records that match the given criteria.
 *
 * @example
 * ```js
 * const { records, pagination } = await query({
 *   type: 'note',
 *   where: {
 *   key_1: { eq: ['author:tnez', 'author:another-one'] },
 *   key_2: { eq: 'cohort:lends' },
 *   version: { eq: '1.0' },
 *   },
 *   orderBy: [
 *     { createdAt: 'descending' },
 *   ],
 *   take: 100,
 * })
 * ```
 */
export function query(input: {
  /**
   * Type of record to be returned
   */
  type: string
  /**
   * Where the documents are filtered with the following criteria
   */
  where?: DocumentWhereClause
  /**
   * Return records ordered by the following terms
   */
  orderBy?: DocumentOrderClause
  /**
   * Retrun at most this many number of records
   */
  take?: number
  /**
   * Return records after the given cursor (if given)
   */
  after?: string | null
}): Promise<{ documents: Document[]; pagination: Pagination }>

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
  keys?: Partial<{
    key_1: string
    key_2: string
    key_3: string
    key_4: string
  }>,
): Promise<Document>

/**
 * Remove the specified record from the datastore
 * @param id
 */
export function remove(id: string): Promise<void>

export type Data = {
  insert: typeof insert
  query: typeof query
  update: typeof update
  remove: typeof remove
}

export default Data
