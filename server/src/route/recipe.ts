import * as express from 'express';
import { HttpStatus } from "../model/http_status";
import { RecipeController, Recipes } from "../controller/recipe";
import { RecipesModel } from "../model/recipes";

module Route {

    export class Recipe {

        public router: express.Router;

        constructor() {
            this.router = express.Router();

            this.router.post("/", this.create.bind(this));
            this.router.get("/", this.getAll.bind(this));
        }

        private async create(req: express.Request, res: express.Response) {

            let name = req.body["name"];
            let group = req.body["group"];
            let symbol = req.body["symbol"];
            let numbers = req.body["number"];
            let instructions = req.body["instructions"];
            let ingredients = req.body["ingredients"];

            if (!name || !group || !symbol || numbers === undefined || !instructions || !ingredients) {
                res.status(HttpStatus.Bad_Request).json({
                    success: false,
                    msg: "Missing parameters"
                });
            }

            try {
                let recipe = await RecipeController.getInstance().create(<Recipes>{
                    name: name,
                    group: group,
                    symbol: symbol,
                    number: numbers,
                    instructions: instructions,
                    ingredients: ingredients
                });
                if (recipe) {
                    res.json({
                        success: true,
                        recipe: recipe
                    });
                } else {
                    res.status(HttpStatus.Bad_Request).json({
                        success: false,
                        msg: "Fail to create recipe"
                    });
                }
            } catch (err) {
                res.status(HttpStatus.Internal_Server_Error).json({ success: false, err: err });
            }
        }

        private async getAll(req: express.Request, res: express.Response) {
            try {
                let recipes = await RecipeController.getInstance().getAll();
                if (recipes) {
                    res.json({
                        success: true,
                        recipes: recipes
                    });
                } else {
                    res.status(HttpStatus.Bad_Request).json({
                        success: false,
                        msg: "No recipes found"
                    });
                }
            } catch (err) {
                res.status(HttpStatus.Internal_Server_Error).json({ success: false, err: err });
            }
        }
    }
}

export = Route;
