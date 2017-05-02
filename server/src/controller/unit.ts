import { UnitsModel, UnitsRepository } from "../model/units";

module Controller {

    export class UnitController {

        private static instance: UnitController;
        private unitsRepository: UnitsRepository;

        public static getInstance() {
            if (!UnitController.instance) {
                UnitController.instance = new UnitController();
            }
            return UnitController.instance;
        }

        private constructor() {
            this.unitsRepository = new UnitsRepository();
        }

        public async create(unit: UnitsModel) {
            try {
                let newUnit = await this.unitsRepository.create(unit);
                return newUnit;
            } catch (err) {
                throw err;
            }
        }

        public async getByName(name: string) {
            try {
                let unit = await this.unitsRepository.findOne({ name: name });
                return unit;
            } catch (err) {
                throw err;
            }
        }

        public async getAll() {
            try {
                let units = await this.unitsRepository.find();
                return units;
            } catch (err) {
                throw err;
            }
        }
    }
}

export = Controller;
