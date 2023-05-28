import React from 'react'
import image from "./pictures/todolist.png"
import './component.css'
import axios from 'axios'
export default function HomePage() {
  const gotolist=()=>{
   axios.get('http;//localhost:5000/')
  }
  return (
    <div>
    <div className='flex'>
    <div className='box'>
        <div className='flex1'>
        <h1 style={{color:"blue"}}>Procrasti</h1><h1 style={{color:"black"}}>Create</h1>
        </div>
        <div className='flex1'>
        <h1 className='size' style={{color:"#636378"}}>Create•</h1>
        <h1 className='size' style={{color:"green"}}>Your•</h1>
        <h1 className='size' style={{color:"black"}}>To-do•List.</h1>
        </div>
        <button className='btn' onClick={gotolist}>To Do List-{'>'}</button>
    </div>
      <img src={image} className='box1' alt='not available'></img>
      </div>
    </div>
  )
}
