import React, {Component} from "react";
import axios from "axios";

import StatisticTable from "../../components/StatisticTable/StatisticTable";

class Confirmed extends Component {
    state = {
        total: 0,
        confirmedList: []
    };

    componentDidMount() {
        let stName;
        let total = 0;
        axios.get('http://netiget.ir:88/states')
            .then(res => {
                res.data.map(state => {
                    stName = state.nameEn;
                    const today = state.crna_dtls[state.crna_dtls.length - 1];
                    total = total + Number(today.confirmed_prs);
                    if (today.Active) {
                        this.setState({
                            confirmedList: this.state.confirmedList.concat({
                                "stName": stName,
                                "recovered": today.confirmed_prs
                            })
                        })
                    }
                });
                this.setState({total: total})
            })
    }

    render() {
        return (
            <StatisticTable
                color="#FF8000"
                topic="Confirmed"
                total={this.state.total}
                list={this.state.confirmedList}/>
        );
    }
}

export default Confirmed;