import { useNavigate } from "react-router-dom";
import { useEffect , useState} from "react";
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";



function Sendotp(){
    const navigate = useNavigate();


    const [open, setOpen] = useState(true);
    const [email, setEmail] = useState('');

    // const sendOtp = () =>{
    //     navigate('/Forgetpassword');
    // }

    const sendOtp = async (e) =>{
       console.log("email", email) 
        try {
            const res = await axios.post("http://localhost:3550/auth/sendOtp", 
            {email});
            console.log(res);
            navigate('/Forgetpassword' , {state: {data: email}});
          } catch (error) {
            
          }
        }   
  
        
     return(
        <>
        <Dialog open={open} >
        <DialogTitle>Send Otp</DialogTitle>
        <DialogContent>
        <TextField
            //   defaultValue = {data.name}
              name="email"
              variant="standard"
              label="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your email"
              fullWidth
              //   helperText={incorretfirstname ? " " : " This filed is required "}
            />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => sendOtp()}    size="small">Send otp</Button>
        </DialogActions>
      </Dialog>



      </>
     )
} 
export  default Sendotp;