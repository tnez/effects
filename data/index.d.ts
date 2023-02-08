import type {
  DocumentMetadata,
  DocumentMetadataKeys,
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
  sk1?: string
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  sk2?: string
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  sk3?: string
  /**
   * A search key that can be used to partition subsets of records
   * @example `user_1234`
   * @example `team_1234`
   */
  sk4?: string
  /**
   * A field that is used to hold text that can be searched.
   * Application logic is responsible for figuring out what should be included in this field to enable full-text search. This field is simply made available and indexed for efficient searching.
   * @example 'Title of the note And the body of the note is concatenated here'
   */
  text?: string
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

type DocumentSearchKeys = keyof Pick<Document, 'sk1' | 'sk2' | 'sk3' | 'sk4'>
type DocumentTimestampKeys = keyof Pick<
  DocumentMetadata,
  'createdAt' | 'updatedAt'
>
type DocumentVersionKeys = keyof Pick<Document, 'version'>

type DocumentOrderKey = DocumentSearchKeys | 'createdAt' | 'updatedAt'
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
  | { isNull: boolean }
  | { lt: string }
  | { lte: string }
type Negate<T> = { not: T }
type DocumentWhereKey =
  | DocumentSearchKeys
  | DocumentTimestampKeys
  | DocumentVersionKeys
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
  record: Omit<Document, DocumentMetadataKeys>,
): Promise<Document>

/**
 * Query data for a list of records that match the given criteria.
 *
 * @example - an example of a query that returns all records of type `note` that have been authored by either `tnez` or `another-one` and are part of the `lends` cohort.
 * ```js
 * const { records, pagination } = await query({
 *   type: 'note',
 *   where: {
 *     key_1: { eq: ['author:tnez', 'author:another-one'] },
 *     key_2: { eq: 'cohort:lends' },
 *     version: { eq: '1.0' },
 *   },
 *   orderBy: [
 *     { createdAt: 'descending' },
 *   ],
 *   take: 100,
 * })
 *
 * @example - an example of a query that returns all records of type `note` that include the text `pattern to search for within note` in full-text searchable content.
 * const { records, pagination } = await query({
 *   type: 'note',
 *   text: 'pattern to search for within note',
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
   * Return records ordered by the following terms. Keep in mind that the order of the items in the array is respsected when sorting.
   * @default [{ createdAt: 'descending' }]
   * @example `[{ sk1: 'ascending' }, { updatedAt: 'descending' }]`
   */
  orderBy?: DocumentOrderClause
  /**
   * Retrun at most this many number of records
   * @default 100
   * @example 25
   */
  take?: number
  /**
   * Use full-text search to return records that match the given text
   * @example 'pattern to search for within note'
   */
  text?: string
  /**
   * Return records after the given cursor (if given)
   */
  after?: string | undefined
}): Promise<{ documents: Document[]; pagination: Pagination }>

/**
 * Update the data property of the given record, identified by the specified ID.
 * The update is performed by merging the existing data property with new data provided.
 * @param id - ID of the record to be updated
 * @param data - New data to be merged with the existing data property
 * @param internals - Internal properties, such as search keys and full-text search text, that can be updated.
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
  internals?: Partial<Pick<Document, DocumentSearchKeys | 'text'>>,
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
