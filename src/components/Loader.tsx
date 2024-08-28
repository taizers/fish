import { ProgressSpinner } from "primereact/progressspinner";
import { FC } from "react";
 
const Loader: FC = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <ProgressSpinner />
        </div>
    );
}
 
export default Loader;