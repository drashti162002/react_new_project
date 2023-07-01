import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Button } from "@mui/material";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Getallpost from "./Getallpost";
import Alluserpost from "./Alluserpost";

function Dashbord(){

 const navigate = useNavigate();

 const token = localStorage.getItem('Token');
//  console.log(token)

 const [data, setData] = useState([]);
 const [anchorEl, setAnchorEl] = useState(null);


 useEffect (() =>{
   // loginUserData()
    if (!localStorage.getItem('Token')){
        navigate('/')
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

  const userShowProfile = () =>{
    navigate("/Profile");
  }

  const userAddPost = () =>{
    navigate("/Createpost");
  }

  // const userEditData = () =>{
  //   navigate("/Editdata");
  // }
  
  const userPasswordUpdate = () =>{
    navigate("/Updatepassword");
  }

  // const userAllPost = () =>{
  //   navigate("/Alluserpost");
  // }

  const userpaginationPost = () =>{
    navigate("/Paginationdata");
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const userLogout = () => {
    localStorage.removeItem('Token');
    navigate('/');
  }
  

    return (


    <>
      <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
          <Avatar onClick={() =>userShowProfile()} sx={{ bgcolor: red[500] }} aria-label="recipe">
            D
          </Avatar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 , marginLeft:5 }}>
          {data.name}
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem  onClick={() =>userAddPost()}>Add Post</MenuItem>
                {/* <MenuItem  onClick={() =>userAllPost()}>All user post</MenuItem> */}
                <MenuItem  onClick={() =>userpaginationPost()}>Pagination data</MenuItem>
                {/* <MenuItem  onClick={() =>userEditData()}>Edit Userdata</MenuItem> */}
                <MenuItem  onClick={() =>userPasswordUpdate()}>Updatepassword</MenuItem>
                <MenuItem  onClick={() =>userLogout()}>Logout user</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Alluserpost/>
      {/*============<Getallpost/> ==========*/}
    </Box>
    </>
    )
}
export default Dashbord;