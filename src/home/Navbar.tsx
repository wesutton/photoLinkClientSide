import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavItem
} from 'reactstrap';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Sitebar: React.FC<{clickLogout: (logout: React.FormEvent) => void }> = (props) => {
    return (
        <div>
        <Stack direction="row" spacing={2}>
            <Navbar color = "faded" light expand = "md">
                <NavbarBrand href = '/'>PhotoLink</NavbarBrand>
                <Button onClick={props.clickLogout} variant="outlined">Logout</Button>
            </Navbar> 
        </Stack>
        </div>
    )
}

export default Sitebar;
