import {DataModel} from "../models/data.model";

export function sortElemsByDeviceId(data: DataModel[]) {
    return data.sort((a, b) => {
        return a.deviceId - b.deviceId;
    });
}
