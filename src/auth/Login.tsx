import React, {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginFail from '../components/UI/LoginFail';
import APIURL from '../helpers/environments'


type AcceptedProps = {
    updateToken: (newToken: any) => void;
    handleChange: (event: string | React.SyntheticEvent, newValue: number) => void,
    message?: string
}

const Login: React.FC<AcceptedProps> = (props) =>{

    const paperStyle={padding :20 , height:'fit-content',width:300, margin:"0 auto", }
    const avatarStyle={backgroundColor:'#1bbd7e', marginLeft: '110px'}
    const btnstyle={margin:'8px 0'}

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    let handleSubmit = (event: React.FormEvent) =>{
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST', 
            body: JSON.stringify({user: {username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        }).catch((error) => {
            setError(
               true
            )
                 console.log(error)
            })
        }

    return(
    <div>
        {error && <LoginFail/>}
    <Grid>
            <Paper  style={paperStyle}>
                <Grid alignContent ='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Login</h2>
                </Grid> 
                <form onSubmit={handleSubmit}>
                <TextField onChange={(e) => setUsername(e.target.value)} label='Username' name='username' placeholder='Enter username' fullWidth required value={username}/>
                <TextField onChange={(e) => setPassword(e.target.value)} label='Password' name='password' placeholder='Enter password' type='password' fullWidth required value={password}/>
                <br/>
                <br/>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>   
                </form>
                <Typography > Need an Account?
                    <br/>
                     <Link href="#" onClick={()=>props.handleChange("event", 1)} >
                        Sign Up 
                    </Link>
                </Typography>
            </Paper>
        </Grid></div>
        
       
    )
}

export default Login