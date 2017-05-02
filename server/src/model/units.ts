import * as mongoose from 'mongoose';
import { RepositoryBase } from "./database";
export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface UnitsModel extends mongoose.Document {
    name: string;
    standard: number;
}

let schema = new Schema({
    name: {
        type: String,
        required: true
    },
    standard: {
        type: Number,
        required: true
    }
});

export let unitsModel = mongoose.model<UnitsModel>("unit", schema, "units", true);

export class UnitsRepository extends RepositoryBase<UnitsModel> {
    constructor() {
        super(unitsModel);
    }
}
