import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";



function Editdata(){

    const navigate = useNavigate();

    const token = localStorage.getItem('Token');
    console.log(token)
  
    const [data, setData] = useState('');
    const [open, setOpen] = useState(false);


    useEffect (() =>{
        loginUserData()
       }, [])
     
       const loginUserData = async (e) =>{     
         try {
           const res = await axios.get("http://localhost:3550/users/profile", {
             headers: {'logingtoken': token }});
             console.log(res);
            console.log(res.data.data);
            setData(res.data.data)
            setOpen(true)
         } catch (error) {
           console.log(error)
         }
       }
          
       const [userValue , setUserValue] = useState({
         name: data.name,
         email: data.email,
         phonoNo: data.phonoNo
       })

       const getData = (e) => {
        console.log(userValue)
        const { name, value } = e.target;
        setUserValue({ ...userValue, [name]: value });
      };
    
 


      
        const dataSubmit = async (e) =>{
            console.log('click')
            console.log(userValue)

            try {
              const {name,  email, phonoNo } = userValue;
              const res = await axios.put("http://localhost:3550/users/updateProfile", 
              userValue,
              { headers: {'logingtoken': token }});
              console.log(res);
              navigate('/Dashbord');
            } catch (error) {
              
            }
          }

       






    return(
        <>
        <Dialog open={open} >
        <DialogTitle>User Data</DialogTitle>
        <DialogContent>
        <TextField
              defaultValue = {data.name}
              name="name"
              variant="standard"
              value={userValue.name}
              label="Name"
              placeholder="Enter Your Firstname"
              onChange={getData}
              fullWidth
              //   helperText={incorretfirstname ? " " : " This filed is required "}
            />
       <TextField
          defaultValue = {data.email}
          name="email"
          variant="standard"
          value={userValue.email}
          label="email"
          placeholder="Enter Your Email"
          onChange={getData}
          fullWidth
        /><br></br>
        <TextField
          defaultValue ={data.phonoNo}
          name="phonoNo"
          variant="standard"
          value={userValue.phonoNo}
          label="PhoneNumber"
          placeholder="Enter Your PhoneNumber"
          onChange={getData}
         fullWidth
        /><br></br>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => dataSubmit()}    size="small">Update</Button>
        </DialogActions>
      </Dialog>



      </>
    )
}
export default Editdata;