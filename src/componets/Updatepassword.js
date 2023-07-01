import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Button, TextField, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import axios from 'axios'
import { pink } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Updatepassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const token = localStorage.getItem('Token');
  console.log(token)


  const [valuepassword, setvaluePassword] = useState({
    oldPassword:'',
    newPassword:''
 })
 
 const handlechange = (e) =>{
    const { name, value } = e.target;
    setvaluePassword({...valuepassword, [name]:value})
  }

  const userPasswordChange = async (e) =>{
    try {
      const {oldPassword,  newPassword} = valuepassword;
      const res = await axios.put("http://localhost:3550/users/updatePass", 
      {oldPassword,  newPassword},
      { headers: {'logingtoken': token }});
      console.log(res);
     navigate('/Dashbord');
  
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <>
      <div className="all_card">
        <Paper
          className="paperBackground"
          elevation={20}
          sx={{ borderRadius: 5 }}
        >
        <div className="all_paper">
        <div className="first_paper">
          <div>
            <Typography variant="h4" sx={{ color: grey[800] }}>
              Create New Password
            </Typography>
          </div>

          <div>
        <TextField
          sx={{ width: "52ch", mt: 5, backgroundColor: grey[100] }}
          name="oldPassword"
          onChange={handlechange}
         value={valuepassword.oldPassword}
          id="input-with-icon-textfield"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          label="Old Password"
          placeholder="Old Password"
        />
      </div>

      <div>
            <TextField
            sx={{ width: "52ch", mt: 5, backgroundColor: grey[100] }}
            name="newPassword"
            onChange={handlechange}
            value={valuepassword.newPassword}
            id="input-with-icon-textfield"
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                ),
            }}
            variant="outlined"
            label="New Password"
            placeholder="New Password"
            />
      </div>

          <Button
            sx={{ mt: 5, width: "57ch", boxShadow: 10 }}
            variant="contained"
            onClick={() =>userPasswordChange()}
          >
           Reset Password   
          </Button>
        </div>
        <div className="second_paper">
            <Typography variant="h4">
             Hello, Friend!
            </Typography>

            <Typography variant="body1"   sx={{ mt: 4 , p:2}}>
              Your new Password must be different from previous used passwords.
            </Typography>
        </div>
        </div>
        </Paper>
      </div>
    </>
  );
}
export default Updatepassword;
