import { Model } from "../model";
import { ListOpts } from "./list-opts";

export class Pokemon extends Model {
  private name: string;

  public static get(name: string) {
    return this.api().pokemon().get(name);
  }

  public static list(options: ListOpts) {
    return this.api().pokemon().list(options);
  }

  public static listFromUrl(url: string) {
    return this.api().pokemon().listFromUrl(url);
  }
}