import './DeviceState.css';
import Tile from "./shared/Tile";
import {useParams} from 'react-router-dom';
import {DataModel} from "../models/data.model";

interface DeviceStateProps {
    data: DataModel[];
}

function DevicesState({data} : DeviceStateProps) {
    let {id} = useParams();

    return (
        <>
            {data && <div style={{display: "flex", flexWrap: "wrap", justifyContent: 'center'}}>
                {data.map(tile => {

                    const isActive = id !== undefined && tile.deviceId === +id;
                    return (
                        <div key={tile.deviceId} className="tile-device">
                            <Tile
                                id={tile.deviceId}
                                active={isActive}
                                hasData={Boolean(tile.readingDate)}
                                data={tile}>
                            </Tile>
                        </div>
                    );
                })}
            </div>}
        </>
    )
}

export default DevicesState;
