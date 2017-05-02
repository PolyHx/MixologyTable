import * as express from 'express';
import { HttpStatus } from "../model/http_status";
import { IngredientController } from "../controller/ingredient";
import { IngredientsModel } from "../model/ingredients";

module Route {

    export class Ingredient {

        public router: express.Router;

        constructor() {
            this.router = express.Router();

            this.router.post("/", this.create.bind(this));
            this.router.get("/", this.getAll.bind(this));
        }

        private async create(req: express.Request, res: express.Response) {

            let name = req.body["name"];

            if (!name) {
                res.status(HttpStatus.Bad_Request).json({
                    success: false,
                    msg: "Missing parameters"
                });
            }

            try {
                let ingredient = await IngredientController.getInstance().create(<IngredientsModel>{
                    name: name
                });
                if (ingredient) {
                    res.json({
                        success: true,
                        ingredient: ingredient
                    });
                } else {
                    res.status(HttpStatus.Bad_Request).json({
                        success: false,
                        msg: "Fail to create ingredient"
                    });
                }
            } catch (err) {
                res.status(HttpStatus.Internal_Server_Error).json({ success: false, err: err });
            }
        }

        private async getAll(req: express.Request, res: express.Response) {
            try {
                let ingredients = await IngredientController.getInstance().getAll();
                if (ingredients) {
                    res.json({
                        success: true,
                        ingredients: ingredients
                    });
                } else {
                    res.status(HttpStatus.Bad_Request).json({
                        success: false,
                        msg: "No ingredients found"
                    });
                }
            } catch (err) {
                res.status(HttpStatus.Internal_Server_Error).json({ success: false, err: err });
            }
        }
    }
}

export = Route;
