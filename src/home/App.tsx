import React, {Component, useState, useEffect} from 'react'
import SplashBar from './Splashbar';
import Footer from './Footer';
import {
    BrowserRouter as Router,
} from 'react-router-dom';

const App: React.FC<{token: string|null}> = (props) => {
        return (
            <div>
                <Router>
                    <SplashBar token = {props.token}  />
                </Router>
                <Footer/>
            </div>
        )
    }

export default App;
