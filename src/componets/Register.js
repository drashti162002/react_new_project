import { Typography, Button, TextField, Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function Register() {

 const navigate = useNavigate();

 const [user, setUser] = useState({
    name:'',
    phonoNo:'',
    email:'',
    password:''
 })

 const handlechange = (e) =>{
   const { name, value } = e.target;
   setUser({...user, [name]:value})
 }

  const registerData = async (e) =>{
    try {
      e.preventDefault();
      console.log(user)
      const {name ,  phonoNo , email,  password } = user;
      const res = await axios.post("http://localhost:3550/users/reg", {name ,  phonoNo , email,  password});
      console.log(res);
      if(res.status === 400 || !res){
          window.alert("invalid user")
          console.log('invalid user')
      } else{
          window.alert("Register user")
          console.log('Register user')
          navigate('/');
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="full_page">
      <Paper
        elevation={5}
        sx={{ width: 600, p: 5, m: "auto", borderRadius: 7 }}
      >
        <div>
          <Typography variant="h4" sx={{ color: grey[800], mb: 5 }}>
            Registration form
          </Typography>
        </div>
        <div>
          <TextField
            sx={{ width: "52ch", mt: 2 }}
            id="outlined-basic"
            label="Name"
            name='name'
            variant="outlined"
            onChange={handlechange}
            value={user.name}


          />
        </div>
        <div>
          <TextField
            sx={{ width: "52ch", mt: 5 }}
            id="outlined-basic"
            label="Phone No."
            variant="outlined"
            name='phonoNo'
            onChange={handlechange}
            value={user.phonoNo}
          />
        </div>
        <div>
          <TextField
            sx={{ width: "52ch", mt: 5 }}
            id="outlined-basic"
            label="email"
            variant="outlined"
            name='email'
            onChange={handlechange}
            value={user.email}
          />
        </div>
        <div>
          <TextField
            sx={{ width: "52ch", mt: 5 }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name='password'
            onChange={handlechange}
            value={user.password}
          />
        </div>
        <Button sx={{ mt: 5, width: 150, boxShadow: 10 }} 
         onClick={registerData}
         variant="contained">
          Submit
        </Button>
      </Paper>
    </div>
  );
}
export default Register;
