import React, {Component} from "react";
import {Map, TileLayer, GeoJSON} from "react-leaflet";
import './MyMap.css'
import axios from 'axios';


class Mymap extends Component {
    // constructor(props) {
    //     super(props);
    //     this.selectHandler = this.selectHandler.bind(this)
    // }
    state = {
        geoData: [],
        coronaData: [],
        selected: 'death'
    };
    componentDidMount() {
        axios.get('http://netiget.ir:88/state-geo-locations').then(res => {
            this.makeGeoData(res);
        });
        axios.get('http://netiget.ir:88/states').then( res => {
            this.makeCoronaData(res);
        });
    }

    makeCoronaData = res => {
        let stateId = 0;
        res.data.map(state => {
            stateId ++ ;
             let dtls = state.crna_dtls[state.crna_dtls.length - 1];
            this.setState({
                coronaData: this.state.coronaData.concat({
                    "stateId" : stateId ,
                    "death": dtls.t_death_prs,
                    "confirmed": dtls.confirmed_prs ,
                    "recovered": dtls.t_recovered,
                    "active": dtls.active
                })
            })
        })
    };

    makeGeoData = res => {
        res.data.map( state => {
            this.setState({
                geoData: this.state.geoData.concat(state.detail[0].location)
            });
        });
        this.setState({
            geoKey: this.state.geoKey + 1
        })
    };

    style = (color , opacity) => {
        return {
            fillColor: color,
            weight: 1,
            opacity: 0.3,
            color: 'white',
            dashArray: '0',
            fillOpacity: opacity
        }
    };

    selectHandler = event => {
        this.setState({
            selected: event.target.value
        });
        this.forceUpdate();
    };

    renderStates =(geoData, coronaData) => {
        let color;
        let situation = "";
        switch (this.state.selected) {
            case "death":
                color = "#FF0000";
                situation = "death";
                break;
            case "confirmed":
                color = "#FF8000";
                situation = "confirmed";
                break;
            case "recovered":
                color = "#3ADF00";
                situation = "recovered";
                break;
        }
        return coronaData.map( dtl => {
            let opacity = 0;
            let count = Number(dtl[situation]);
            // if (count > 350) {
            //     opacity = 1;
            // } else if (350 > count && count > 200) {
            //     opacity = 0.75 ;
            // } else if (200 > count && count > 100) {
            //     opacity = 0.5 ;
            // } else if (300 > count && count > 1) {
            //     opacity = 0.25 ;
            // }
            opacity = count / 1000;
            if (opacity > 1) {
                opacity = 1;
            }

            return (<GeoJSON key={dtl.stateId + situation} data={geoData[dtl.stateId - 1]} style={this.style(color , opacity)}/>)
        });
    };

    render() {
        return (
            <div className="MyMap">
                <form className="Input">
                    <select onChange={this.selectHandler.bind(this)} name="situation">
                        <option value="death">death</option>
                        <option value="confirmed">confirmed</option>
                        <option value="recovered">recovered</option>
                    </select>
                </form>
                <Map id="mapid" center={[32, 55]} zoom={6} zoomControl={false}>
                    <TileLayer url='http://netiget.ir:8080/styles/dark-matter/{z}/{x}/{y}.png'
                               attribution='<a href=\"http://www.openmaptiles.org/\" target=\"_blank\">&copy; OpenMapTiles</a> <a href=\"http://www.openstreetmap.org/about/\" target=\"_blank\">&copy; OpenStreetMap contributors</a>'/>
                    {this.renderStates(this.state.geoData, this.state.coronaData)}
                </Map>
            </div>
        );
    }
}

export default Mymap;