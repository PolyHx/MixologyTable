'use strict';

import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Index } from './route/index';
import * as database from "./model/database";
import { Unit } from "./route/unit";
import { Ingredient } from "./route/ingredient";
import { Recipe } from "./route/recipe";


export class Application {

    public app: express.Application;

    public static bootstrap(): Application {
        return new Application();
    }

    constructor() {

        database.initialize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD).catch((err) => {
            console.log(err);
        });
        this.app = express();

        this.config();
        this.routes();
    }

    private config() {

        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "pug");

        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '../../frontend/dist')));
        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(cors());
    }

    public routes() {

        let index: Index = new Index();
        let unit: Unit = new Unit();
        let ingredient: Ingredient = new Ingredient();
        let recipe: Recipe = new Recipe();
        this.app.use("/", index.router);
        this.app.use("/unit", unit.router);
        this.app.use("/ingredient", ingredient.router);
        this.app.use("/recipe", recipe.router);

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            let err = new Error('Not Found');
            next(err);
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 404);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }
}
