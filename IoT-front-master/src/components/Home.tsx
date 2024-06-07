import './DeviceState.css';
import {useState, useEffect} from "react";
import serverConfig from "../server-config";
import DevicesState from "./DevicesState";
import {sortElemsByDeviceId} from "../utils/helper";
import Loader from "./shared/Loader";
import {DataModel} from "../models/data.model";

function Home() {

    const [data, setData] = useState<DataModel[] | null>(null);
    const [loaderState, setLoaderState] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoaderState(true);
        fetch(`${serverConfig.serverUrl}data/latest`)
            .then(response => response.json())
            .then(data => {
                setData(sortElemsByDeviceId(data));
                setLoaderState(false)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <>
            <div style={{backgroundColor: '#000', display: 'flex', justifyContent: 'center'}}>
                {loaderState &&
                    <div style={{marginTop: '50vh'}}>
                        <Loader/>
                    </div>
                }
                {!loaderState && data && <DevicesState data={data}/>}
            </div>
        </>
    )
}

export default Home;
