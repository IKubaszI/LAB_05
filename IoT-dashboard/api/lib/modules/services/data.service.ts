import DataModel from "../schemas/data.schema";
import { IData, Query } from "../models/data.model";
import { config } from "../../config";

export default class DataService {
    public async createData(dataParams: IData) {
        try {
            const dataModel = new DataModel(dataParams);
            await dataModel.save();
        } catch (error) {
            console.error("An error occurred while creating data:", error);
            throw new Error("An error occurred while creating data");
        }
    }

    public async query(deviceID: string) {
        try {
            const data = await DataModel.find({ deviceId: deviceID }, { __v: 0, _id: 0 });
            return data;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }


    // Nowe
    public async get(deviceId: string) {
        try {
            const getData = await DataModel.find(
                { deviceId: deviceId },{ __v: 0, _id: 0 }).limit(1).sort({ $natural: -1 });
            return getData;
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async getAllNewest(
        startId: any = 1,
        range: any = config.supportedDevicesNum
    ) {
        const latestData: Array<any> = [];

        await Promise.all(
            Array.from({ length: range }, async (_, i) => {
                const deviceId = (i + startId).toString();
                try {
                    const latestEntry = await DataModel.find(
                        { deviceId },{ __v: 0, _id: 0 }).limit(1).sort({ $natural: -1 });
                    if (latestEntry.length) {
                        latestData.push(latestEntry[0]);
                    } else {
                        latestData.push({ deviceId });
                    }
                } catch (error) {
                    console.error(`${error.message} -> Error while downloading data for device ${deviceId}: `);
                    latestData.push({});
                }
            })
        );

        return latestData.sort(
            (a, b) => parseInt(a.deviceId) - parseInt(b.deviceId)
        );
    }

    public async deleteData(id: any = {}): Promise<void> {
        try {
            await DataModel.deleteMany({ deviceId: id });
        } catch (error) {
            console.error(`Deletion failed: ${error}`);
            throw new Error("Deletion failed");
        }
    }
}