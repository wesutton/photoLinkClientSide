import React, { Component, useState, useEffect } from "react";
import About from "./about/About";
import Photos from "./photos/Photos";
import './UserPage.scss'

const UserPage: React.FC<{token: string | null}> = (props) =>{
   

    return (
        <div className="userpage">
            {/* <h3>UserPage</h3>
            <About /> */}
            <Photos token = {props.token} />
        </div>
    );
 }


export default UserPage;