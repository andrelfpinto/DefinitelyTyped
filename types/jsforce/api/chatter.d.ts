import { Connection, callback } from '../connection';
import { Query } from '../query';
import { Stream } from 'stream';

interface BatchRequestParams extends RequestParams {
    method: string;
    url: string;
    richInput?: string;
}

interface BatchRequestResult {
    statusCode: string;
    result: RequestResult;
}

interface BatchRequestResults {
    hasError: boolean;
    results: BatchRequestResult[];
}

interface RequestParams {
    method: string;
    url: string;
    body?: string;
}

export class RequestResult {
}

export class Request<T> implements Promise<T> {
    constructor(chatter: Chatter, params: RequestParams);

    batchParams(): BatchRequestParams;

    promise(): Promise<T>;

    stream(): Stream;

    catch<TResult>(onrejected?: ((reason: any) => (PromiseLike<TResult> | TResult)) | null | undefined): Promise<T | TResult>;

    then<TResult1, TResult2>(onfulfilled?: ((value: T) => (PromiseLike<TResult1> | TResult1)) | null | undefined,
                             onrejected?: ((reason: any) => (PromiseLike<TResult2> | TResult2)) | null | undefined): Promise<TResult1 | TResult2>;

    thenCall(callback?: (err: Error, records: T) => void): Query<T>;

    readonly [Symbol.toStringTag]: 'Promise';
}

export class Resource<T> extends Request<T> {
    constructor(chatter: Chatter, url: string, queryParams?: object);

    create(data: object | string, callback?: callback<T>): Request<T>;

    del(callback?: callback<T>): Request<T>;

    delete(callback?: callback<T>): Request<T>;

    retrieve(callback?: callback<T>): Request<T>;

    update(data: object, callback?: callback<T>): Request<T>;
}

export class Chatter {
    constructor(conn: Connection);

    batch(callback?: callback<BatchRequestResults>): Promise<BatchRequestResults>;

    request(params: RequestParams, callback?: callback<Request<RequestResult>>): Request<RequestResult>;

    resource(url: string, queryParams?: object): Resource<RequestResult>
}
