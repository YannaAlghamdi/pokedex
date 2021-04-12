import { ApiClient } from './api/api-client';

export class Model {
    private static _api: ApiClient;
    private order: number;

    static setApiClient(arg: ApiClient) {
        this._api = arg;
    }

    static api(): ApiClient {
        return this._api;
    }

    api(): ApiClient {
        return Model._api;
    }

    public getOrder(): number { return this.order; }
    public withOrder(arg: number) { this.order = arg; return this; }
}