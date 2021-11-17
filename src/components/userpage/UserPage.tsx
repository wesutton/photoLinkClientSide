import React, { Component, useState, useEffect } from "react";
import About from "./about/About";
import Photos from "./photos/Photos";
import './UserPage.scss'

const UserPage: React.FC<{token: string | null}> = (props) =>{
   
    // const [myPosts, setMyPosts] = useState([]);

    // const fetchMyPosts = () => {
    //     fetch('http://localhost:3000/mypage/myposts', {
    //         method: 'GET',
    //         headers: new Headers ({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     }) .then ((res) => res.json())
    //     .then((posts) => {
    //         setMyPosts(posts)
    //         console.log(posts)
    //     })
    // }

    // useEffect(() => {
    //     fetchMyPosts();
    // }, [])
    
    


    return (
        <div className="userpage">
            <h3>UserPage</h3>
            <About />
            <Photos token = {props.token} />
        </div>
    );
 }


export default UserPage;