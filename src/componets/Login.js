import * as React from 'react';
import { Typography,Link, Button, TextField, Paper } from "@mui/material";
import { useState , useEffect} from "react";
import { grey } from "@mui/material/colors";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import OutlinedInput from '@mui/material/OutlinedInput';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Register from './Register'


function Login() {

 const navigate = useNavigate();


 useEffect (() =>{
   if (localStorage.getItem('Token')){
       navigate('/Dashbord');
   }
 }, [])

  const [user, setUser] = useState({
    email:'',
    password:''
 })
 
 const handlechange = (e) =>{
  const { name, value } = e.target;
  setUser({...user, [name]:value})
}

const loginData = async (e) =>{

  try {
    e.preventDefault();
    console.log(user)
    const {email,  password } = user;
    const res = await axios.post("http://localhost:3550/users/loging", {email,  password });
    console.log(res);
    if(res.status === 401 || !res){
      console.log('invalid user')
      window.alert("invalid user")
    } else{
        window.alert("Login user")
        console.log('Login user')
        localStorage.setItem('Token', res.data.data.token)
        navigate('/Dashbord');
    }
  } catch (error) {
    
  }
}

const passwordChange = (e) =>{
  navigate('/Sendotp');
}

  return (
    <div className="full_login_page">
      <Paper 
        className="paperBackground"
        elevation={5}
        sx={{ width: 500, p: 5, m: "auto", borderRadius: 7 }}
      >
      <div className='person_icon'>
        <Avatar  className='user_icon' sx={{ bgcolor: pink[500] , width: 70, height:70 }}>
        <PersonIcon />
      </Avatar>
        </div>
        <div>
          <Typography variant="h4" sx={{ color: grey[800] }}>
            Login in 
          </Typography>
        </div>

        <div>
        <TextField
        sx={{ width: "52ch", mt: 5 , backgroundColor:'white' }}
        name='email'
        onChange={handlechange}
        value={user.email}
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <PersonIcon/>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder='Email'
      />
        </div>

        <div>
        <TextField
        sx={{ width: "52ch", mt: 5 , backgroundColor:'white' }}
        name='password'
        onChange={handlechange}
        value={user.password}
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <LockIcon/>
            </InputAdornment>
          ),
        }}
        variant="outlined"
        placeholder='Password'
      />
        </div>
       
        <Button 
         onClick={loginData} 
         sx={{ mt: 5, width:'57ch', boxShadow: 10 }} variant="contained">
          Submit
        </Button>
        <Typography  sx={{ mt: 2}}>
         Do You Have Account <Link href={'/Register'}>Sign in</Link>
        </Typography>
        <Typography  sx={{ mt: 5}}>
          <Link onClick={(e) => passwordChange(user.email)} >Forget password ?</Link>
        </Typography>
      </Paper>
    </div>
  );
}
export default Login;
