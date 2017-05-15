import {Injectable} from '@angular/core';
import {HttpClient} from "../utils/httpclient";

@Injectable()
export class RecipeService {
  API_URL = "http://mixology.fun:8189";

  constructor(public http: HttpClient) {
  }

  public async getRecipes() {
    const result = await this.http.get(this.API_URL + "/recipe");
    return result.recipes;
  }

}
