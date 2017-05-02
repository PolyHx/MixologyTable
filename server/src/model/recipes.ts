import * as mongoose from 'mongoose';
import { RepositoryBase } from "./database";
import { IngredientsModel } from "./ingredients";
import { UnitsModel } from "./units";
import { PartsModel } from "./parts";
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface RecipesModel extends mongoose.Document {
    name: string;
    group: string;
    symbol: string;
    number: number;
    pictureUrl: string;
    instructions: string;
    ingredients: PartsModel[];
}

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    pictureUrl: {
        type: String,
        required: false
    },
    instructions: {
        type: String,
        required: true
    },
    ingredients: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'part'
    }]
});

export let recipesModel = mongoose.model<RecipesModel>("recipe", schema, "recipes", true);

export class RecipesRepository extends RepositoryBase<RecipesModel> {
    constructor() {
        super(recipesModel);
    }

    public findOneAndPopulate(cond?: Object): Promise<RecipesModel> {
        return new Promise<RecipesModel>((resolve, reject) => {
            this._model.findOne(cond, (err: any, res: RecipesModel) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }).populate({
                path: 'ingredients',
                populate: [{ path: 'unit' }, { path: 'ingredient' }]
            });
        });
    }

    public findAndPopulate(cond?: Object, options?: Object): Promise<RecipesModel[]> {
        return new Promise<RecipesModel[]>((resolve, reject) => {
            this._model.find(cond, options, (err: any, res: RecipesModel[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }).populate({
                path: 'ingredients',
                populate: [{ path: 'unit' }, { path: 'ingredient' }]
            });
        });
    }

    public findByIdAndPopulate(_id) {
        return new Promise<RecipesModel>((resolve, reject) => {
            this._model.findById({ _id: _id }, (err: any, res: RecipesModel) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }).populate({
                path: 'ingredients',
                populate: [{ path: 'unit' }, { path: 'ingredient' }]
            });
        });
    }
}
