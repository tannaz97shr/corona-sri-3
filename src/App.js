import React from 'react';
import './App.css';

import Logo from "./components/Logo/Logo";
import Recoverd from "./containers/Recovered/Recoverd";
import RightColumn from "./containers/RightColumn/RightCoulumn";
import Mymap from "./containers/MyMap/Mymap";
import MiddleColumn from "./containers/MiddleColumn/MiddleColumn";

function App() {
    return (
        <div className="main-body">
            <div className="header"><Logo/></div>
            <div className="row">
                <div className="column left"><Recoverd /></div>
                <div className="column middle"><Mymap /></div>
                <div className="column right"><RightColumn /></div>
            </div>
        </div>

    );
}

export default App;
