/**
 * Metadata that is included in all Document types.
 */
export type DocumentMetadata = {
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

/**
 * Keys of DocumentMetadata exported as a convenience.
 */
export type DocumentMetadataKeys = keyof DocumentMetadata
