import { IngredientsModel, IngredientsRepository } from "../model/ingredients";

module Controller {

    export class IngredientController {

        private static instance: IngredientController;
        private ingredientsRepository: IngredientsRepository;

        public static getInstance() {
            if (!IngredientController.instance) {
                IngredientController.instance = new IngredientController();
            }
            return IngredientController.instance;
        }

        private constructor() {
            this.ingredientsRepository = new IngredientsRepository();
        }

        public async create(ingredient: IngredientsModel) {
            try {
                let newIngredient = await this.ingredientsRepository.create(ingredient);
                return newIngredient;
            } catch (err) {
                throw err;
            }
        }

        public async getAll() {
            try {
                let ingredients = await this.ingredientsRepository.find();
                return ingredients;
            } catch (err) {
                throw err;
            }
        }

        public async getByName(name: string) {
            try {
                let ingredient = await this.ingredientsRepository.findOne({ name: name });
                return ingredient;
            } catch (err) {
                throw err;
            }
        }
    }
}

export = Controller;
