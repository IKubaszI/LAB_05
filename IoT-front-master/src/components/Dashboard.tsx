import { useEffect, useState} from 'react';
import DevicesState from "./DevicesState";
import CurrentState from "./CurrentState";
import Charts from "./Charts";
import serverConfig from "../server-config";
import {sortElemsByDeviceId} from "../utils/helper";
import {useParams} from "react-router-dom";
import Loader from "./shared/Loader";
import {DataModel} from "../models/data.model";

function Dashboard() {
    let {id} = useParams();
    const [data, setData] = useState<DataModel[] | null>(null);
    const [lastItem, setLastItem] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);
    const [loaderState, setLoaderState] = useState(true);
    const [loaderChart, setLoaderChart] = useState(true);

    useEffect(() => {
        fetchData();
        fetchAdditionalData();
    }, [id]);

    const fetchData = () => {
        setLoaderState(true);
        fetch(`${serverConfig.serverUrl}data/latest`)
            .then(response => response.json())
            .then((data: DataModel[]) => {
                const sortedData = sortElemsByDeviceId([...data]);
                setData(sortedData);
                setLoaderState(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchAdditionalData = () => {
        setLoaderChart(true);
        fetch(`${serverConfig.serverUrl}data/${id}/30`)
            .then(response => response.json())
            .then(data => {
                setLastItem(data[data.length - 1])
                setAdditionalData(data);
                setLoaderChart(false);
            })
            .catch(error => {
                console.error('Error fetching additional data:', error);
            });
    };

    return (
        <>
            <div style={
                {
                    display: 'flex',
                    height: '50vh',
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    borderBottom: '10px solid #fff',
                    padding: '50px'
                }}>
                <div>
                    {loaderChart && <Loader/>}
                    {!loaderChart && <CurrentState data={lastItem}/>}
                </div>
                <div>
                    {loaderChart && <Loader/>}
                    {!loaderChart && additionalData && <Charts data={additionalData}/>}
                </div>

            </div>

            <div style={{backgroundColor: '#000', display: 'flex', justifyContent:'center'}}>
                {loaderState && <Loader/>}
                {!loaderState && data && <DevicesState data={data}/>}
            </div>

        </>
    );
}

export default Dashboard;
