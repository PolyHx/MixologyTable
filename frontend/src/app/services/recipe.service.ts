import {Injectable} from '@angular/core';
import {HttpClient} from "../utils/httpclient";

@Injectable()
export class RecipeService {
  API_URL = "https://mixology.fun";

  constructor(public http: HttpClient) {
  }

  public async getRecipes() {
    const result = await this.http.get(this.API_URL + "/recipe");
    return result.recipes;
  }

}
