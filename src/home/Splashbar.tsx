import React, {Component} from "react";
import {
    Link, 
    Switch, 
    Route
} from 'react-router-dom';
import {Button} from 'antd'
import Welcome from "../components/welcome/Welcome";
import UserPage from "../components/userpage/UserPage";
import Search from "../components/search/Search";
import EditImage from "../components/userpage/photos/EditImage";
import EditReview from "../components/userreviews/components/EditReview";
import CommentsIndex from "../components/search/comments/CommentsIndex";
import Auth from "../auth/Auth";
import  classes from './SplashBar.module.css'
import UserReviews from "../components/userreviews/UserReviews";
import CommentsModal from "../components/userpage/photos/CommentsModal";

interface SplashbarProps{
    updateToken: (newtoken: any) => void,
    token: string | null
    clickLogout: (logout: React.FormEvent) => void 
}


const SplashBar = (props: SplashbarProps) => {

        return(
            <div className ={classes.splashbarDiv}>
                <div className = {classes.splashbarStyling}>
                    <ul className = {classes.splashbarUl}>
                        <li><Link to = "/"  className = {classes.link} >Welcome</Link></li>
                        <li><Link to = "/MyPhotos" className = {classes.link}>MyPhotos</Link></li>
                        <li><Link to = "/MyReviews"  className = {classes.link}>MyReviews</Link></li>
                        <li><Link to = "/Explore"className = {classes.link} >Explore</Link></li>
                        <li><Link to = "/Auth" className = {classes.link} >Login</Link></li>
                        <li><Button onClick={props.clickLogout}  className="button">Logout</Button></li>
                    </ul>
                </div>
                <div  className = "splashbar-route">
                    <Switch>
                        <Route exact path ="/Auth"><Auth updateToken={props.updateToken}/></Route>
                        <Route exact path ="/"><Welcome/></Route>
                        <Route path ="/MyPhotos"><UserPage token = {props.token}/></Route>
                        <Route exact path ="/MyReviews"><UserReviews token = {props.token}/></Route>
                        <Route exact path ="/Explore"><Search token = {props.token}/></Route>
                        <Route path = "/mypage/edit/:id"><EditImage token = {props.token}/></Route>
                        <Route path = "/mypage/:id"><CommentsIndex token = {props.token}/></Route>
                        <Route exact path = "/reviews/:entryid"><EditReview token = {props.token}/></Route>
                        <Route path = "/allreviews/:imageId"><CommentsModal token = {props.token}/></Route>
                    </Switch>
                </div>
            </div>
        )
    }


export default SplashBar;