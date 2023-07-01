import axios from "axios";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Link from "@mui/material/Link";
import CommentIcon from '@mui/icons-material/Comment';
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Slider from 'react-slick';
import { useNavigate } from "react-router-dom";


function Showallpost(props){

  const [anchorEl, setAnchorEl] = useState(null);
  const [nav2, setNav2] = useState();

  const navigate = useNavigate();


const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
  
  };

  const userPostDelete = async (id) =>{
    console.log('id===', id);
    try {
        const res = await axios.delete(`http://localhost:3550/post/deletePost/${id}`, {
          headers: { logingtoken: props.token },
        });
        console.log("res",res);
        const deleteUser = props.data.filter((obj) => obj._id !== id);
           console.log(res.data.data);
        props.setData(deleteUser);
      } catch (error) {
        console.log(error);
      }
      handleClose();
    };

    const userImagePostShow = () =>{
      console.log({ data: props.data , token: props.token , user:props.user , setData:  props.setData });
      navigate('/Profileuserpost' ,  {state: { data: props.data , token: props.token , user:props.user  }})
    }
    return(
        <>
        {/* <Toolbar>
          <Avatar src="/broken-image.jpg" />
          <Typography
            variant="h7"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 4 }}
          >
            {props.user.userId.name}
            <Typography
              variant="h7"
              component="div"
              sx={{ color: "text.disabled" }}
            >
              10 hours ago
              {props.user._id}
            </Typography>
          </Typography>

          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Edit Post</MenuItem>
                <MenuItem onClick={(e) => userPostDelete(props.user._id)}>Delete Post</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar> */}

        {/* <Typography
          className="text"
          variant="h4"
          component="h5"
          sx={{ color: "black" }}
        >
          {props.user.caption}
        </Typography>
        <Link>#topical</Link> <Link>#lorem</Link> <Link>#ipsum</Link> */}

        <Slider  {...settings}>
        {/* <div className="all_image"> */}
            {props.user.images.map((image, index) =>{
                 return(
                  <img src={image} className="img-1" alt={image} onClick={() => userImagePostShow()}/>
                 )
            })}

        {/* </div> */}
        </Slider>


        {/* <img src={ user.images[0]} className="img-2" alt={user.images[0]}/>  */}
        {/* <BottomNavigation
          sx={{
            borderTop: 1,
            borderBottom: 1,
            borderColor: "grey.500",
            marginTop: 2,
          }}
        >
          <BottomNavigationAction
            label="Recents"
            icon={<FavoriteIcon />}
            sx={{ borderRight: 1, borderColor: "grey.500" }}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<CommentIcon />}
            sx={{ borderRight: 1, borderColor: "grey.500" }}
          />
          <BottomNavigationAction label="Nearby" icon={<ThumbUpIcon />} />
        </BottomNavigation> */}
      </>
    )
}
export default Showallpost;