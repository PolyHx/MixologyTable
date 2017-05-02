import * as express from 'express';
import { HttpStatus } from "../model/http_status";
import { UnitController } from "../controller/unit";
import { UnitsModel } from "../model/units";

module Route {

    export class Unit {

        public router: express.Router;

        constructor() {
            this.router = express.Router();

            this.router.post("/", this.create.bind(this));
            this.router.get("/", this.getAll.bind(this));
        }

        private async create(req: express.Request, res: express.Response) {

            let name = req.body["name"];
            let standard = req.body["standard"];

            if (!name || standard === undefined) {
                res.status(HttpStatus.Bad_Request).json({
                    success: false,
                    msg: "Missing parameters"
                });
            }

            try {
                let unit = await UnitController.getInstance().create(<UnitsModel>{
                    name: name,
                    standard: standard
                });
                if (unit) {
                    res.json({
                        success: true,
                        unit: unit
                    });
                } else {
                    res.status(HttpStatus.Bad_Request).json({
                        success: false,
                        msg: "Fail to create unit"
                    });
                }
            } catch (err) {
                res.status(HttpStatus.Internal_Server_Error).json({ success: false, err: err });
            }
        }

        private async getAll(req: express.Request, res: express.Response) {
            try {
                let units = await UnitController.getInstance().getAll();
                if (units) {
                    res.json({
                        success: true,
                        units: units
                    });
                } else {
                    res.status(HttpStatus.Bad_Request).json({
                        success: false,
                        msg: "No units found"
                    });
                }
            } catch (err) {
                res.status(HttpStatus.Internal_Server_Error).json({ success: false, err: err });
            }
        }
    }
}

export = Route;
