import React, { Component } from 'react'
import { AiFillGithub } from 'react-icons/ai';
import './Footer.css'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <p>  Created by William Sutton <span>&copy;</span> 2021 <a href="https://github.com/wesutton/photoLinkClientSide.git" target="_blank" style = {{textDecoration:'none', color: 'gray'}}><AiFillGithub style={{width: '50px', height: '25px'}}/></a> </p>
            </footer>
        )
    }
}
 