import React from 'react'
import login from './pictures/login.webp'
export default function Singup() {
  const redirect=()=>{
    window.location.replace('http://localhost:5000/user/googleLogin')
  }
  return (
    <div>
    {/* <h1>Signup</h1> */}
    <div className='flex' style={{height:"90vh"}}>

     <div className='flex1'><img src={login} className='box2' ></img></div>
  <div className='flex2'>
  <button onClick={redirect} style={{height:"60px",marginBottom:"20px",width:"200px",borderRadius:"100px",backgroundColor:"red",fontSize:"25px",color:"white",borderColor:"red",marginTop:"10px"}} >Google+</button>
      <button style={{height:"60px",width:"200px",borderRadius:"100px",backgroundColor:"black",fontSize:"25px",color:"white"}} >Github</button></div>
    </div></div>
  )
}
