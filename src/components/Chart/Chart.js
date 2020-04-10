import React from "react";
import {Line} from "react-chartjs-2";

import './Chart.css'

const styles = {
    graphContainer: {
        border: '1px solid black',
        padding: '15px',
        height: '300px'
    }
};

const options = {
    showScale: false,
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                beginAtZero:true,
                min: 0,
                max: 1000
            }
        }]
    },
    title : {
        display: false
    },
    legend: {
        display: false
    }
};

const Chart = props => (
    <div className='Container' style={styles.graphContainer}>
        <Line data={props.chartData} options={options} />
    </div>
);

export default Chart;