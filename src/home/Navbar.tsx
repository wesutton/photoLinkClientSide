import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavItem
} from 'reactstrap';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Navbar.scss'



const Sitebar: React.FC<{clickLogout: (logout: React.FormEvent) => void }> = (props) => {
    return (
            <Navbar color = "faded" light expand = "md" className = "navbar">
                <NavbarBrand href = '/'>PhotoLink</NavbarBrand>
                <ul className="navbar-items">
                    <li><Button onClick={props.clickLogout} variant="outlined" className="button">Logout</Button></li>
                </ul>
            </Navbar> 

      

    )
}

export default Sitebar;
