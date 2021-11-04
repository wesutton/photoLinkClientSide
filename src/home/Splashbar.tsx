import React, {Component} from "react";
import {
    Link, 
    Switch, 
    Route
} from 'react-router-dom';
import Welcome from "../components/welcome/Welcome";
import UserPage from "../components/userpage/UserPage";
import Search from "../components/search/Search";


const SplashBar: React.FC<{token: string | null}> = (props) => {

        return(
            <div className = "splashbar-div">
                <div className = "splashbar-styling">
                    <ul className = "splashbar-ul">
                        <li><Link to = "/">Welcome</Link></li>
                        <li><Link to = "/MyPage">MyPage</Link></li>
                        <li><Link to = "/Explore">Explore</Link></li>
                    </ul>
                </div>
                <div  className = "splashbar-route">
                    <Switch>
                        <Route exact path ="/"><Welcome/></Route>
                        <Route exact path ="/MyPage"><UserPage token = {props.token}/></Route>
                        <Route exact path ="/Explore"><Search/></Route>
                    </Switch>
                </div>
            </div>
        )
    }


export default SplashBar;