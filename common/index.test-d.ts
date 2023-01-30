import { expectAssignable, expectNotAssignable } from 'tsd'
import type { DocumentMetadata, DocumentMetadataKeys } from '.'

const validDocumentMetadata = {
  id: 'DOC-ID-ABCD-1234',
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
}

expectAssignable<DocumentMetadata>(validDocumentMetadata)
expectNotAssignable<DocumentMetadata>({
  ...validDocumentMetadata,
  extraKey: 'no way man',
})
expectNotAssignable<DocumentMetadata>({
  ...validDocumentMetadata,
  id: undefined,
})

type Document = DocumentMetadata & { foo: string }
type DocumentWithoutMetadata = Omit<Document, DocumentMetadataKeys>
expectAssignable<DocumentWithoutMetadata>({ foo: 'baz' })
expectNotAssignable<DocumentWithoutMetadata>({ id: 'DOC-1234', foo: 'baz' })
