import React from "react";

import './RightColumn.css';
import Confirmed from "../Confirmed/Confirmed";
import Death from '../Death/Death';
import Mychart from "../MyChart/Mychart";

const RightColumn = () => (
    <div>
        <div className="TableContainer">
            <div className="TableDeath">
                <Death />
            </div>
            <div className="TableConfirmed">
                <Confirmed />
            </div>
        </div>
        <div className="Box">
            <Mychart />
        </div>
    </div>
);

export default RightColumn;