import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
interface props{
  roleId:number
}

function Home({roleId}:props) {
 

  return (
    <div>
        <Sidebar roleId={roleId}/>
    </div>
  )
}

export default Home