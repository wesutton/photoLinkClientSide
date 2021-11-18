import React, {Component, useState, useEffect} from 'react'
import SplashBar from './Splashbar';
import Footer from './Footer';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

interface AppProps{
    updateToken: (newtoken: any) => void,
    token: string | null,
    clickLogout: (logout: React.FormEvent) => void,

}

const App = (props: AppProps) => {
        return (
            <div>
                <Router>
                    <SplashBar clickLogout={props.clickLogout} token = {props.token} updateToken={props.updateToken}  />
                </Router>
                <Footer/>
            </div>
        )
    }

export default App;
