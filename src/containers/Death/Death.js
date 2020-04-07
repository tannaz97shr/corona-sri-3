import React, {Component} from "react";
import axios from "axios";

import StatisticTable from "../../components/StatisticTable/StatisticTable";

class Death extends Component {
    state = {
        total: 0,
        deathList: []
    };

    componentDidMount() {
        let stName;
        let total = 0;
        axios.get('http://netiget.ir:88/states')
            .then(res => {
                res.data.map(state => {
                    stName = state.nameEn;
                    const today = state.crna_dtls[state.crna_dtls.length - 1];
                    total = total + Number(today.t_death_prs);
                    if (today.Active) {
                        this.setState({
                            deathList: this.state.deathList.concat({
                                "stName": stName,
                                "recovered": today.t_death_prs
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
                color="#FF0000"
                topic="Death"
                total={this.state.total}
                list={this.state.deathList}/>
        );
    }
}

export default Death;