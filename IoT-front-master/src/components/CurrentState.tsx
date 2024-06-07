import Tile from "./shared/Tile";
import {useParams} from 'react-router-dom';
import {DataModel} from "../models/data.model";

interface CurrentStateProps {
    data: DataModel | null;
}

function CurrentState({data}: CurrentStateProps) {
    let {id} = useParams();

    return (
        <>
            <Tile
                id={id}
                data={data}
                details={false}
                hasData={Boolean(data?.readingDate)}>
            </Tile>
        </>
    );
}

export default CurrentState;
