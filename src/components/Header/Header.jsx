import React from "react";
import { Link } from 'react-router-dom';

function Header(){

    return(
        <div>
            <ul>
                <li>
                    <image>Placeholder</image>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Purchase">Purchase</Link>
                </li>
                <li>
                    <Link to="/Gallery">Gallery</Link>
                </li>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Account">Account</Link>
                </li>
      </ul>
        </div>
    )
};
export default Header;