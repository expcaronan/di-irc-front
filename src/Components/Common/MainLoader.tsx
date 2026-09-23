import React from 'react'

function MainLoader() {
  return (
    <div style={{position:"fixed", top:"0", left:"700",
    width:"100%", height:"100%", display:"flex", alignItems:"center",
    justifyContent:"center"}}>
     <div className="spinner-border text-warning" style={{width:"4rem",height:"4rem" }} >
      
      </div>
    </div>
  )
}

export default MainLoader