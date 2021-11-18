import React, {useState} from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


const Signup: React.FC<{updateToken: (session: string | number) => void }> = (props) => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e', marginLeft: '110px' }
    const marginTop = { marginTop: 5 }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    let handleSubmit = (event: React.FormEvent) =>{
        event.preventDefault();
        fetch("http://localhost:3000/user/create", {
            method: 'POST', 
            body: JSON.stringify({user: {firstName: firstName, lastName: lastName, username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
        }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid alignContent ='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField onChange={(e) => setFirstName(e.target.value)} fullWidth label='First' name ='firstName' placeholder="Enter your first name" value={firstName} required/>
                    <TextField onChange={(e) => setLastName(e.target.value)} fullWidth label='Last' name='lastName' placeholder="Enter your last name" value={lastName} required/>
                    <TextField onChange={(e) => setUsername(e.target.value)} fullWidth label='Username' name = 'username' placeholder="Enter a display name" value={username} required />
                    <TextField onChange={(e) => setPassword(e.target.value)} fullWidth label='Password' name = 'password' type="password" placeholder="Enter your password" value={password} required/>
                    <br/>
                    <br/>
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;
