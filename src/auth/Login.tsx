import React, {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

type AcceptedProps = {
    updateToken: (newToken: any) => void;
    handleChange: (event: string | React.SyntheticEvent, newValue: number) => void
}

const Login: React.FC<AcceptedProps> = (props) =>{

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event: React.FormEvent) =>{
        event.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: 'POST', 
            body: JSON.stringify({user: {username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
        }

    return(
        <Grid>
            <Paper  style={paperStyle}>
               
                <Grid alignContent ='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Login</h2>
                </Grid> 
                <form onSubmit={handleSubmit}>
                <TextField onChange={(e) => setUsername(e.target.value)} label='Username' name='username' placeholder='Enter username' fullWidth required value={username}/>
                <TextField onChange={(e) => setPassword(e.target.value)} label='Password' name='password' placeholder='Enter password' type='password' fullWidth required value={password}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>   
                </form>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>props.handleChange("event", 1)} >
                        Sign Up 
                    </Link>
                </Typography>
             
            </Paper>
        </Grid>
    )
}

export default Login