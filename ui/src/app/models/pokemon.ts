import { Model } from "../model";

export class Pokemon extends Model {
  private name: string;

  public static list(offset: number) {
    return this.api().pokemon().list(offset);
  }
}