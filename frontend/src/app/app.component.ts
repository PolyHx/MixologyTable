import {Component} from '@angular/core';
import {RecipeService} from "./services/recipe.service";

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentElement;
  public elements: any[] = [];
  public cart: any[] = [];

  public ingredientsList: any[] = [];

  constructor(public recipeService: RecipeService) {
    this.init();
  }

  public async init() {
    this.elements = await this.recipeService.getRecipes();
  }

  public getElementById(id: number) {
    const element = this.elements.find((el) => {
      return el.number === id;
    });
    if (element === undefined) {
      return {number: id, group: "Tequila"};
    } else {
      return element;
    }
  }

  public openElementModal(id: number) {
    this.currentElement = this.getElementById(id);
    $('body').css('overflow', 'hidden');
    $('#info-panel').fadeIn('fast');
    $('.overlay').fadeIn('fast');
  }

  public openCart() {
    $('body').css('overflow', 'hidden');
    $('#cart-panel').fadeIn('fast');
    $('.overlay').fadeIn('fast');
  }

  public closeCart() {
    $('.overlay').fadeOut('fast');
    $('#cart-panel').fadeOut('fast');
    $('body').css('overflow', 'auto');
  }

  public closeModal() {
    $('.overlay').fadeOut('fast');
    $('#info-panel').fadeOut('fast');
    $('body').css('overflow', 'auto');
  }

  public getModalBackgroundColorForGroup(group: any) {
    if (group === undefined) {
      return "#fafafa";
    }
    if (group === "Tequila") {
      return "#f4c842";
    } else if (group === "Vodka") {
      return "#f4f141";
    } else if (group === "Gin") {
      return "#4191f4";
    } else if (group === "Frozen") {
      return "#41f4b2";
    } else if (group === "Shooter") {
      return "#bc51ff";
    }
  }

  addToCart(element) {
    if (this.cart.indexOf(element) === -1) {
      this.cart.push(element);
      this.updateCartIngredientsList();
      this.closeModal();
    }
  }

  updateCartIngredientsList() {
    let ingredients: any[] = [];
    for (let recipe of this.cart) {
      for (let ingredient of recipe.ingredients) {
        let existing = ingredients.find((ing) => {
          return ing.ingredient._id === ingredient.ingredient._id;
        });
        if (existing !== undefined) {
          if (existing.quantity === -1) {
            continue;
          }
          existing.quantity += ingredient.quantity * ingredient.unit.standard;
        } else {
          ingredients.push(ingredient);
        }
      }
    }
    this.ingredientsList = ingredients;
  }
}
