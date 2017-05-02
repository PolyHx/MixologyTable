import { RecipesModel, RecipesRepository } from "../model/recipes";
import { PartsModel } from "../model/parts";
import { IngredientController } from "./ingredient";
import { UnitController } from "./unit";
import { PartController } from "./part";
import { IngredientsModel } from "../model/ingredients";
import { UnitsModel } from "../model/units";

module Controller {

    export interface Recipes {
        name: string;
        group: string;
        symbol: string;
        number: number;
        pictureUrl: string;
        instructions: string;
        ingredients: [{
            ingredient: string,
            quantity: number,
            unit: string
        }];
    }

    export class RecipeController {

        private static instance: RecipeController;
        private recipesRepository: RecipesRepository;

        public static getInstance() {
            if (!RecipeController.instance) {
                RecipeController.instance = new RecipeController();
            }
            return RecipeController.instance;
        }

        private constructor() {
            this.recipesRepository = new RecipesRepository();
        }

        public async create(recipe: Recipes) {

            let recipes: RecipesModel = <RecipesModel>{
                name: recipe.name,
                group: recipe.group,
                symbol: recipe.symbol,
                number: recipe.number,
                instructions: recipe.instructions,
                ingredients: [],
            };

            try {
                for (let part of recipe.ingredients) {
                    let parts: PartsModel = <PartsModel>{ quantity: part.quantity };
                    let ingredient = await IngredientController.getInstance().getByName(part.ingredient);
                    if (ingredient) {
                        parts.ingredient = ingredient._id;
                    } else {
                        ingredient = await IngredientController.getInstance()
                            .create(<IngredientsModel>{ name: part.ingredient });
                        parts.ingredient = ingredient._id;
                    }
                    let unit = await UnitController.getInstance().getByName(part.unit);
                    if (unit) {
                        parts.unit = unit._id;
                    } else {
                        unit = await UnitController.getInstance()
                            .create(<UnitsModel>{ name: part.unit });
                        parts.unit = unit._id;
                    }
                    parts = await PartController.getInstance().create(parts);
                    recipes.ingredients.push(parts._id);
                }

                let newRecipe = await this.recipesRepository.create(recipes);
                return newRecipe;
            } catch (err) {
                throw err;
            }
        }

        public async getAll() {
            try {
                let recipes = await this.recipesRepository.findAndPopulate();
                return recipes;
            } catch (err) {
                throw err;
            }
        }
    }
}

export = Controller;
