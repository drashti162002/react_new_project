import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllUserShowpost from './AllUserShowpost';



function Alluserpost(){

    const token = localStorage.getItem("Token");

    const [data, setData] = useState([]);
  

    useEffect(() => {
        loginUserData();
      }, []);

      const loginUserData = async (e) => {
        try {
          const res = await axios.get("http://localhost:3550/post/postData?page=1", {
            headers: { logingtoken: token },
          });
          console.log("res",res);
          console.log(res.data.post);
          setData(res.data.post);
        } catch (error) {
          console.log(error);
        }
      };
    


    return(
        <>
        {data?.map((user, index) => {
          return (
              <AllUserShowpost  user={user} token={token} data={data} setData={setData}/>
          );
        })}
      </>
    )
}
export default Alluserpost;