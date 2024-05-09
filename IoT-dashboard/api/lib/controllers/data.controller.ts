import Controller from "interfaces/controller.interface";
import { Request, Response, NextFunction, Router } from 'express'
import {checkIdParam} from "../middlewares/deviceIdParam.middleware";
import DataService from "../modules/services/data.service";
import Joi from "joi";

// let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService: DataService;

    constructor() {
        this.dataService = new DataService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/:id`, checkIdParam, this.addData);

        this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
        this.router.get(`${this.path}/:id`, checkIdParam, this.getAllDeviceData);
        this.router.get(`${this.path}/:id/latest`, checkIdParam, this. getPeriodData);
        this.router.get(`${this.path}/:id/:num`, checkIdParam, this. getRangeID);

        this.router.delete(`${this.path}/all`, this. cleanAllDevices);
        this.router.delete(`${this.path}/:id`, checkIdParam, this. cleanDeviceData);
    }

    private getLatestReadingsFromAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query(id);
        response.status(200).json(allData);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { air } = request.body;
        const { id } = request.params;

        const schema = Joi.object({
            air: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().integer().positive().required(),
                        value: Joi.number().positive().required()
                    })
                )
                .unique((a, b) => a.id === b.id),
            deviceId: Joi.number().integer().positive().valid(parseInt(id, 10)).required()
        });

        try {
            const validateData = await schema.validateAsync({air, deviceId: parseInt(id, 10)});
            const readingData = {
                temperature: validateData.air[0].value,
                pressure: validateData.air[1].value,
                humidity: validateData.air[2].value,
                deviceId: validateData.deviceId
            }

            await this.dataService.createData(readingData);
            response.status(200).json(readingData);
        } catch (error: any) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({ error: 'Invalid input data.' });
        }
    }


    private getAllDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const data = await this.dataService.query(id);
        response.status(200).json(data);
    };

    private getPeriodData = async (request: Request, response: Response, next: NextFunction) => {
        const { id }  = request.params;
        const data = await this.dataService.get(id);

        response.status(200).json(data);
    };

    private getRangeID = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const { userNumber } = request.params;
        const data = await this.dataService.getAllNewest(id, userNumber);

        response.status(200).json(data);
    };

    private cleanAllDevices = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteData();
        response.status(200).json({ message: "All data for all devices has been deleted." });
    };

    private cleanDeviceData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData(id);

        response.status(200).json({ message: `Data for device with id ${id} has been deleted.` });
    };


}

export default DataController;


