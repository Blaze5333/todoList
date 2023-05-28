import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import Singup from './component/Singup';
import Todolist from './component/Todolist';
import { useState } from 'react';
import Loginerror from './component/Loginerror';
function App() {
  const [buttonName, setbuttonName] = useState('Login')
  const buttonfunc=(param)=>{
      setbuttonName(param)
  }
  const fun=()=>{
    console.log('fun')
    window.location.replace('http://localhost:5000/user/googleLogin')
  }
  return (
    <BrowserRouter>
    <Navbar buttonName={buttonName} />
    <Routes>
     <Route path='/' element={<HomePage/>}></Route>
     <Route path='/signupPage' element={<Singup/>}></Route>
     <Route path='/todolist' element={<Todolist buttonfunc={buttonfunc}/>}></Route>
     <Route path='autherror' element={<Loginerror/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
