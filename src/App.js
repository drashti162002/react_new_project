import './App.css';
import {Routes , Route} from 'react-router-dom';
import Register from './componets/Register'
import Login from './componets/Login'
import Dashbord from './componets/Dashbord';
import Editdata from './componets/Editdata';
import Updatepassword from './componets/Updatepassword';
import Appbar from './componets/Appbar';
import Profile from './componets/Profile';
import Createpost from './componets/Createpost';
import Alluserpost from './componets/Alluserpost';
import Commentpost from './componets/Commentpost';
import Forgetpassword from "./componets/Forgetpassword";
import Sendotp from './componets/Sendotp';
import Paginationdata from './componets/Pagiantiondata';
import Profileuserpost from './componets/Profileuserpost'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Register' element={ <Register/>}></Route>
        <Route path='/Dashbord' element={<Dashbord/>}></Route>
        <Route path='/Createpost' element={<Createpost/>}></Route>
        <Route path='/Profile' element={<Profile/>}></Route>
        <Route path='/Editdata' element= {<Editdata/>}></Route>
        <Route path='/Updatepassword' element={<Updatepassword/>}></Route>
        <Route path='/Alluserpost' element={<Alluserpost/>}></Route>
        <Route path='/Commentpost/:id' element={<Commentpost/>}></Route>
        <Route path='/Sendotp' element={<Sendotp/>}></Route>
        <Route path='/Forgetpassword' element={<Forgetpassword/>}></Route>
        <Route path='/Paginationdata' element={<Paginationdata/>}></Route>
        <Route path='/Profileuserpost' element={<Profileuserpost/>}></Route>
        
      </Routes>
  
    </div>
  );
}

export default App;
