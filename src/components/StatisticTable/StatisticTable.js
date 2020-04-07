import React from "react";

import './StatisticTable.css';

const StatisticTable = (props) =>  (
        <div>
            <div className="SumBox">
                <p>Total {props.topic}</p>
                <p style={{
                    fontSize: '30px',
                    color: props.color
                }}>{props.total}</p>

            </div>
            <div className="List">
                {
                    props.list.map(item => (
                        <div className="Item" key={item.stName}>
                            <span style={{
                                color: props.color,
                                marginRight: "4px"
                            }}>{item.recovered}</span>
                            {item.stName}
                        </div>
                    ))
                }
            </div>
        </div>
    );

export default StatisticTable;