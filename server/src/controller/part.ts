import { PartsModel, PartsRepository } from "../model/parts";

module Controller {

    export class PartController {

        private static instance: PartController;
        private partsRepository: PartsRepository;

        public static getInstance() {
            if (!PartController.instance) {
                PartController.instance = new PartController();
            }
            return PartController.instance;
        }

        private constructor() {
            this.partsRepository = new PartsRepository();
        }

        public async create(part: PartsModel) {
            try {
                let newPart = await this.partsRepository.create(part);
                return newPart;
            } catch (err) {
                throw err;
            }
        }

        public async getAll() {
            try {
                let parts = await this.partsRepository.find();
                return parts;
            } catch (err) {
                throw err;
            }
        }
    }
}

export = Controller;
