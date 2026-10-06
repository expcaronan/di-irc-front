import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel'
import DocumentAssignedByQuery from '../../Components/Page/Task/HomeMonitoringPage/DocumentAssignedByQuery'
import NotifiedUsers from '../../Components/Page/NotoficationPage/NotifiedUsers';
import notifiedUserBaseModel from '../../Interfaces/BaseModel/notifiedUserBaseModel';
import MainLoader from '../../Components/Common/MainLoader';
import { useGetNotificationListQuery } from '../../Api/taskDocumentApi';
interface props{
    userDetails:EmployeeUserModel
}


function HomeMonitoringTask({userDetails}:props) {
  console.log(userDetails.employeeId);
  const [loading, setLoading] = React.useState(false);
  const [notificationList, setNotificationList] = useState<notifiedUserBaseModel[]>([]);
  const { data, isLoading } = useGetNotificationListQuery(userDetails.employeeId);

  useEffect(() => {
    if (!isLoading && data) {
      setNotificationList(data?.result);
    }
  }, [data, isLoading]);

  return (
    <div>
        {isLoading ? <MainLoader/> : <DocumentAssignedByQuery userDetails={userDetails}
                                  notificationList={notificationList}
        />
        }
    </div>
  )
}

export default HomeMonitoringTask