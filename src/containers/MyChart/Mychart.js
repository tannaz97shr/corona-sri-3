import React, {Component} from "react";
import axios from 'axios';

import Chart from "../../components/Chart/Chart";

class Mychart extends Component {
    state = {
        chartData: {}
    };

    componentDidMount() {
        axios.get('http://netiget.ir:88/states').then ( res => {
           this.datasetGenerator(res.data);
        });
    }

    datasetGenerator = (res) => {
        const dateArr = [];
        const dataDeath = [];
        const dataConfirmed = [];
        const dataRecovered = [];

        // filling datasets :
        res.map( state => {
            state.crna_dtls.map( dtl => {
                dataDeath.push(Number(dtl.t_death_prs));
                dataConfirmed.push(Number(dtl.confirmed_prs));
                dataRecovered.push(Number(dtl.t_recovered));
            })
        });

        //filling Array :
        const firstDate = new Date('2020-03-12T00:00:00.000Z');
        for (let i=0; i<21; i++) {
            const newDate = new Date(firstDate.getTime() + i*1000*60*60*24);
            dateArr.push(`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`);
        }

        this.setState({
            chartData : {
                labels : dateArr,
                datasets: [
                    {
                        label: "Death",
                        data: dataDeath,
                        backgroundColor: '#FF0000',
                        fill: false,
                        pointBorderWidth: '0.01mm',
                        showLine: true
                    },
                    {
                        label: "Confirmed",
                        data: dataConfirmed,
                        backgroundColor: '#FF8000',
                        fill: false,
                        pointBorderWidth: '0.01mm',
                        showLine: true
                    },
                    {
                        label: "Confirmed",
                        data: dataRecovered,
                        backgroundColor: '#3ADF00',
                        fill: false,
                        pointBorderWidth: '0.01mm',
                        showLine: true
                    },

                ]
            }
        })
    };

    render() {
        return (
            <Chart chartData={this.state.chartData} />
        );
    }
}

export default Mychart;