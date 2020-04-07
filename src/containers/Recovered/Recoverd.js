import React, {Component} from "react";
import axios from "axios";

import StatisticTable from "../../components/StatisticTable/StatisticTable";

class Recoverd extends Component {
    state = {
        total: 0,
        recoveredList: []
    };

    componentDidMount() {
        let stName;
        let total = 0;
        axios.get('http://netiget.ir:88/states')
            .then(res => {
                res.data.map(state => {
                    stName = state.nameEn;
                    const today = state.crna_dtls[state.crna_dtls.length - 1];
                    total = total + Number(today.t_recovered);
                    if (today.Active) {
                        this.setState({
                            recoveredList: this.state.recoveredList.concat({
                                "stName": stName,
                                "recovered": today.t_recovered
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
                color="#31B404"
                topic="Recovered"
                total={this.state.total}
                list={this.state.recoveredList}/>
        );
    }
}

export default Recoverd;