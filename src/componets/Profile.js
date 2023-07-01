import "../componets/css/Profile.css";
import { useEffect , useState} from "react";
import axios from 'axios'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Typography } from '@mui/material';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Getallpost from "./Getallpost";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Badge from '@mui/material/Badge';



function Profile(){

    const navigate = useNavigate();

    const token = localStorage.getItem('Token');
    console.log(token)
   
    const [data, setData] = useState([]);

    useEffect (() =>{
        // loginUserData()
         if (!localStorage.getItem('Token')){
             navigate('/Login')
         }
         else(
             loginUserData()
         )
       }, [])
     
       const loginUserData = async (e) =>{
     
         try {
           const res = await axios.get("http://localhost:3550/users/profile", {
             headers: {'logingtoken': token }});
             console.log(res);
            console.log(res.data.data);
            setData(res.data.data)
         } catch (error) {
           console.log(error)
         }
       }

    const arrowstyle ={fontSize:50}
    const pagename = {fontSize:50, color: blue[500]}
    const powerstyle = {fontSize:50}
    const notiname = {fontSize:40}
    const profilename = {fontSize:30}
    const profileemail = { fontSize:25 }
    const profilephono = {fontSize:25  }
    const lineinset = {color: 'black',
        backgroundcolor: 'black',
        height: 2, width:'100%'}

    const backToHome = () =>{
        navigate('/Dashbord')
    }
    
    const backToLogin = ()=>{
        localStorage.removeItem('Token');
        navigate('/')
    }

    const userEditData = () =>{
        navigate("/Editdata");
      }

    return(

        <div className='full_page_profile'>
        <div className='full_profile'>
            <div className='header'>
            <ArrowBackIosIcon style={arrowstyle} onClick={()=>backToHome()}/>
            <div className='title_name'>
                <Typography style={pagename}>
                    Your Profile
                </Typography>
            </div>
            <div className='icon'>
               <PowerSettingsNewIcon style={powerstyle} onClick={()=>backToLogin()}/>
            </div>
            </div>
            <Grid container >
                <Grid xs={3} className='profile'>
                <div style={{textAlign:"center"}}>


                   <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                        <ModeEditOutlineIcon  onClick={() =>userEditData()} sx={{ width: 60, height: 50 , right: -7,  top:-16,  position:"absolute" }}/>
                        }
                    >
                        <Avatar sx={{ width: 150, height: 150 , bgcolor: blue[500] }}   src="/broken-image.jpg"  />
                    </Badge>
                  {/* <Avatar src="/broken-image.jpg" 
                   sx={{ width: 150, height: 150 , bgcolor: blue[500] }}/> */}
                </div>  
                </Grid>

                <Grid xs={9} className='profile'>
                    
                <div className='your_name'>
                <Typography className="box-style two-value" style={profilename}>
                  {data.name}
                </Typography>
                <div className="email_info">
                <Typography className="box-style three-value" style={profileemail}>
                   {data.email}
                </Typography>
                <Typography className="box-style three-value" style={profilephono}>
                   {data.phonoNo}
                </Typography>

                </div>
                </div>

                </Grid>

                <hr
                    style={lineinset}
                >
                </hr>
        

    
                
        




                <Grid xs={12} className='profile'>
                <Getallpost/>
            
                </Grid>


            </Grid>
            

        </div>
        </div>
    );
}

export default Profile;