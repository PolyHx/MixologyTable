import * as mongoose from 'mongoose';
import { RepositoryBase } from "./database";
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IngredientsModel extends mongoose.Document {
    name: string;
}

let schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export let ingredientsModel = mongoose.model<IngredientsModel>("ingredient", schema, "ingredients", true);

export class IngredientsRepository extends RepositoryBase<IngredientsModel> {
    constructor() {
        super(ingredientsModel);
    }
}
