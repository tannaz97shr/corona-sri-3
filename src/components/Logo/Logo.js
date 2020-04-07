import React from "react";

import SriLogo from '../../assets/Logo.png';
import './Logo.css';

const Logo = () => (
    <div className="Logo">
        <img src={SriLogo} alt="SRI" />
        <h4>Soroosh Rayaneh Iranian</h4>
    </div>
);

export default Logo;