import React from 'react'
import "./component.css"
import icon from "./pictures/icon.png"
export default function Navbar() {
  const locate=()=>{

  }
  return (
    <nav class="navbar shadow navbar-expand-lg navbar-light bg-light">
    <img class="navbar-brand icon" src={icon}></img>
  <a class="navbar-brand" href="#">
  <div className='flex1'>
  <h2 style={{color:"blue"}}>Procasti</h2>
  <h2>Create</h2>
  </div>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ">
        <a class="nav-link hover " style={{fontWeight:"1000",fontSize:"20px",color:"grey"}} href="/">Home </a>
      </li>
      <li class="nav-item">
        <a class="nav-link hover" style={{fontWeight:"1000",fontSize:"20px"}} href="/about">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0" action='/signupPage'>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={locate}>Login</button>
    </form>
  </div>
</nav>
  )
}
