import React, {Component} from "react";
import {
    Link, 
    Switch, 
    Route
} from 'react-router-dom';
import Welcome from "../components/welcome/Welcome";
import UserPage from "../components/userpage/UserPage";
import Search from "../components/search/Search";
import EditImage from "../components/userpage/photos/EditImage";
import  classes from './SplashBar.module.css'

const linkStyle = {
    textDecoration: 'none',

}


const SplashBar: React.FC<{token: string | null}> = (props) => {

        return(
            <div className ={classes.splashbarDiv}>
                <div className = {classes.splashbarStyling}>
                    <ul className = {classes.splashbarUl}>
                        <li><Link to = "/"  className = {classes.link} >Welcome</Link></li>
                        <li><Link to = "/MyPage" className = {classes.link}>MyPage</Link></li>
                        <li><Link to = "/Explore"className = {classes.link} >Explore</Link></li>
                    </ul>
                </div>
                <div  className = "splashbar-route">
                    <Switch>
                        <Route exact path ="/"><Welcome/></Route>
                        <Route exact path ="/MyPage"><UserPage token = {props.token}/></Route>
                        <Route exact path ="/Explore"><Search/></Route>
                        <Route path = "/edit/:id"><EditImage/></Route>
                    </Switch>
                </div>
            </div>
        )
    }


export default SplashBar;