import { Model } from "../model";
import { ListOpts } from "./list-opts";

export class Pokemon extends Model {
  name: string;
  url: string;
  index: number;
  type: string

  public static get(name: string) {
    return this.api().pokemon().get(name);
  }

  public static list(options: ListOpts) {
    return this.api().pokemon().list(options);
  }

  public static getFromUrl(url: string) {
    return this.api().pokemon().getFromUrl(url);
  }

  public getName(): string { return this.name; }
  public withName(arg: string) { this.name = arg; return this; }

  public getUrl(): string { return this.url; }
  public withUrl(arg: string) { this.url = arg; return this; }

  public getIndex(): number { return this.index; }
  public withIndex(arg: number) { this.index = arg; return this; }

  public getType(): string { return this.type; }
  public withType(arg: string) { this.type = arg; return this; }
}