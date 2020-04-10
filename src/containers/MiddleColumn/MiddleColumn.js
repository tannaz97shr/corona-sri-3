import React, {Component} from "react";
import axios from 'axios';
import Mymap from "../MyMap/Mymap";

class MiddleColumn extends Component {

    state = {
        geoData: [],
        gepKey: 0
    };

    componentDidMount() {
        axios.get('http://netiget.ir:88/state-geo-locations').then(res => {
            this.makeGeoData(res);
        });
    }
    makeGeoData = res => {
        console.log('data', res);
        res.data.map( state => {
            this.setState({
                geoData: this.state.geoData.concat(state.detail[0].location)
            });
        });
    };

    style = feature => {
        return {
            fillColor: 'red',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '0',
            fillOpacity: 0.3
        }
    };

    render() {
        {console.log('MiddleColumn', this.state.geoData)}
        return(
            <Mymap geoData={this.state.geoData} geoStyle={this.style} />
        );
    }
}

export default MiddleColumn;