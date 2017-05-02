import * as mongoose from 'mongoose';
import { RepositoryBase } from "./database";
import { IngredientsModel } from "./ingredients";
import { UnitsModel } from "./units";
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface PartsModel extends mongoose.Document {
    ingredient: IngredientsModel;
    quantity: number;
    unit: UnitsModel;
}

let schema = new Schema({
    ingredient: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'ingredient'
    },
    quantity: {
        type: Number,
        required: false,
    },
    unit: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'unit'
    },
});

export let partsModel = mongoose.model<PartsModel>("part", schema, "parts", true);

export class PartsRepository extends RepositoryBase<PartsModel> {
    constructor() {
        super(partsModel);
    }

    public findOneAndPopulate(cond?: Object): Promise<PartsModel> {
        return new Promise<PartsModel>((resolve, reject) => {
            this._model.findOne(cond, (err: any, res: PartsModel) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }).populate('ingredient').populate('unit');
        });
    }

    public findAndPopulate(cond?: Object, options?: Object): Promise<PartsModel[]> {
        return new Promise<PartsModel[]>((resolve, reject) => {
            this._model.find(cond, options, (err: any, res: PartsModel[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }).populate('ingredient').populate('unit');
        });
    }

    public findByIdAndPopulate(_id) {
        return new Promise<PartsModel>((resolve, reject) => {
            this._model.findById({ _id: _id }, (err: any, res: PartsModel) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }).populate('ingredient').populate('unit');
        });
    }
}
