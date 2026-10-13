import React from 'react'
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel'
import DocumentApprovedQuery from '../../Components/Page/Task/HomeMonitoringPage/DocumentApprovedQuery'
interface props{
  userDetails:EmployeeUserModel
  empToken:string
}
function HomeApprovedDocuments({userDetails, empToken}:props) {
  return (
    <div>
        <DocumentApprovedQuery userDetails={userDetails} empToken={empToken}/>
    </div>
  )
}

export default HomeApprovedDocuments