export abstract class URLBuilder {
    protected abstract readonly _baseURL: string;
    public abstract build(): string;
}