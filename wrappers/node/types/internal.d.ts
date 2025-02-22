// Requests to the backend.

/**
 * The raw object passed to the backend binary
 */
export interface InternalServiceRequest {
    message_id: number,
    payload: InternalRequestPayload
}

/**
 * The payload describing an action to the backend binary
 */
export type InternalRequestPayload = InternalNewIndexRequest | InternalAddFileRequest | InternalAddRecordRequest | InternalWriteFilesRequest | InternalGetFilesRequest;

export interface InternalNewIndexRequest {
    type: 'NewIndex'
}

export interface InternalAddFileRequest {
    type: 'AddFile',
    index_id: number,
    file_path: string,
    file_contents: string
}

export interface InternalAddRecordRequest {
    type: 'AddRecord'
    index_id: number,
    url: string,
    content: string,
    language: string,
    meta?: Record<string, string>,
    filters?: Record<string, string[]>,
    sort?: Record<string, string>
}

export interface InternalWriteFilesRequest {
    type: 'WriteFiles',
    index_id: number
}

export interface InternalGetFilesRequest {
    type: 'GetFiles',
    index_id: number
}

// Responses from the backend.

/**
 * The raw object returned from the backend binary
 */
export interface InternalServiceResponse {
    message_id: number,
    payload: InternalResponsePayload | InternalResponseError
}

/**
 * The response payload in the case of an error
 */
export interface InternalResponseError {
    type: 'Error',
    message: string
}

/**
 * The response payload in the case of a success
 */
export type InternalResponsePayload = InternalNewIndexResponse | InternalIndexedFileResponse | InternalWriteFilesResponse | InternalGetFilesResponse;

export interface InternalNewIndexResponse {
    type: 'NewIndex',
    index_id: number
}

export interface InternalIndexedFileResponse {
    type: 'IndexedFile',
    page_word_count: number,
    page_url: string,
    page_meta: Record<string, string>
}

export interface InternalWriteFilesResponse {
    type: 'WriteFiles',
    bundle_location: string,
}

export interface InternalGetFilesResponse {
    type: 'GetFiles',
    files: InternalSyntheticFile[],
}

export interface InternalSyntheticFile {
    path: string,
    content: string
}

/**
 * What the service returns to the wrapping javascript detailing a response
 */
export interface InternalResponseCallback {
    exception: Error | null,
    err: InternalResponseError | null,
    result: InternalResponsePayload | null
}