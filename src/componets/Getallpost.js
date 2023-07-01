import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Showallpost from "./Showallpost";
import { Grid } from "@mui/material";


function Getallpost() {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");

  const [data, setData] = useState([]);


  useEffect(() => {
    loginUserData();
  }, []);

  const loginUserData = async (e) => {
    try {
      const res = await axios.get("http://localhost:3550/post/getloging", {
        headers: { logingtoken: token },
      });
      console.log("res",res);
      //    console.log(res.data.data);
      setData(res.data.postData);
    } catch (error) {
      console.log(error);
    }
  };




  return (

     <Grid container>
      {data?.map((user, index) => {
        return (
          <>
  
          <Grid xs={4} sx={{padding: 2}}>
            <Showallpost  user={user} token={token} data={data} setData={setData}/>
          </Grid>
          </>
  
        );
      })}
    </Grid>

  );
}
export default Getallpost;
