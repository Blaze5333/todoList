import React from 'react'
import errorimage from './pictures/autherror.gif'
export default function Loginerror() {
  return (
    <div style={{"height":"98vh","width":"98vw","display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}}>

      <h1>Authentication Error!! 😬💻</h1>
      <img src={errorimage} style={{"height":"50vh","borderRadius":"30px"}}></img>
    </div>
  )
}
