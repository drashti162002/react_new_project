import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect , useState} from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Navigate, useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      < DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  
  function Forgetpassword(props) {
      const{state} = useLocation();
      const navigate = useNavigate();

      const {data} = state;
    const [open, setOpen] = React.useState(true);
    const [user, setUser] = useState({
        email: data,
        otp: '',
        newPassword: ''
    }
    )

    const handlechange = (e) => {
        console.log(user)
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };

      const changeForgetpassword = async (e) =>{
       console.log('user', user)
        try {
        const {email, otp, newPassword} = user;
          const res = await axios.post("http://localhost:3550/auth/forgotPass", user);
            console.log(res);
           console.log(res.data.data);
           navigate('/');
        } catch (error) {
          console.log(error)
        }
      }


  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <>
      <div>
       
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open dialog
        </Button> */}
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Modal title
          </BootstrapDialogTitle>
          <DialogContent dividers>
          <TextField
           defaultValue = {data}
           sx={{ width: "52ch"}}
          disabled
          id="outlined-disabled"
          label="Disabled"
        />
            <div>
          <TextField
            sx={{ width: "52ch", mt: 3 }}
            id="outlined-basic"
            label="OTP"
            variant="outlined"
            name='otp'
            value={user.otp}
            onChange={handlechange}
          />
        </div>
        <div>
          <TextField
            sx={{ width: "52ch", mt: 3 }}
            id="outlined-basic"
            label="New Password"
            variant="outlined"
            name='newPassword'
            onChange={handlechange}
            value={user.newPassword}
          />
        </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=> changeForgetpassword()}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
</>
    );
  }
  export default Forgetpassword;