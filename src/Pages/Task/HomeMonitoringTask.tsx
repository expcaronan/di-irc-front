import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../Interfaces/EmployeeUserModel'
import DocumentAssignedByQuery from '../../Components/Page/Task/HomeMonitoringPage/DocumentAssignedByQuery'
import NotifiedUsers from '../../Components/Page/NotoficationPage/NotifiedUsers';
import notifiedUserBaseModel from '../../Interfaces/BaseModel/notifiedUserBaseModel';
import MainLoader from '../../Components/Common/MainLoader';
import { useGetNotificationListQuery } from '../../Api/taskDocumentApi';
import signalRService from '../../Helpers/SignalR/SignalRService';
import sMessage from '../../Helpers/SignalR/sMessage';
import EnablePushNotifications from '../../Components/Notifications/EnablePushNotifications';
interface props{
    userDetails:EmployeeUserModel
    accessToken:string
}


function HomeMonitoringTask({userDetails,accessToken}:props) {
  console.log(userDetails.employeeId);
  const [loading, setLoading] = React.useState(false);
  
  const { data, isLoading } = useGetNotificationListQuery(userDetails.employeeId);


  const [notificationList, setNotificationList] = useState<notifiedUserBaseModel[]>([]);

//   useEffect(() => {

//     const handleMessage = (message: string) => {

//       if (message === sMessage.serviceProviderMessage) {
//         refetch();
//       }

//     };

//   signalRService.onReceiveMessage(handleMessage);

//   return () => {
//    // signalRService.(handleMessage);
//   };

// }, [refetch]);

  useEffect(() => {
    if (!isLoading && data) {
      setNotificationList(data?.result);
    }
  }, [data, isLoading]);

     if (isLoading) {
        return <MainLoader />;
    }

  return (
    <div>
      
       <EnablePushNotifications/>
        <DocumentAssignedByQuery userDetails={userDetails}
                                  notificationList={notificationList}
                                   accessToken={accessToken}/>
     
    </div>
  )
}

export default HomeMonitoringTask