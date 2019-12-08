import { Action } from 'redux';

export interface BaseActionStatus {
    isRequesting: boolean;
}

export interface ActionStatus extends BaseActionStatus {
    error: string;
}

export interface ActionStatusWithRedirect extends ActionStatus {
    redirect: boolean;
}

export interface ActionStatusWithMessage extends ActionStatus {
    message: string;
}

export interface BulkActionStatus extends BaseActionStatus {
    errors: CollectionById<string>;
}

export namespace APIActions {
    export interface WithData<T> extends Action {
        data: T;
    }
    export interface WithError<T> extends Action {
        error: T;
    }
}

export interface EntityCollection<T> {
    base: CollectionById<T>;
    staged: CollectionById<Partial<T>>;
}

export interface EntityObject<T> {
    base: T;
    staged: Partial<T>;
}

export interface CollectionById<T> {
    [key: string]: T;
}

export interface RedirectState {
    performRedirect: boolean;
}

export interface QueryParams {
    [key: string]: Set<string>;
}

export interface ErrorResponseBody {
    code: string;
    message: string;
}

export interface ResponseSuccess<T> {
    response: Response;
    data: T;
}

export interface ResponseError<T> {
    response: Response;
    error: T;
    code?: string;
}

export interface ParamValidators {
    [key: string]: (val: string) => boolean;
}

export interface InlineMessageProps {
    message: string;
    tooltipText: string;
    url?: string;
    urlText?: string;
}

export interface ListResource<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}
