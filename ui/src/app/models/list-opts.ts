export class ListOpts {
    offset: number;
    limit: number;

    public getOffset(): number { return this.offset; }
    public withOffset(arg: number) { this.offset = arg; return this; }

    public getLimit(): number { return this.limit; }
    public withLimit(arg: number) { this.limit = arg; return this; }
}