import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import leaveApplicationModel from '../../../../Interfaces/BaseModel/leaveApplicationModel';
import { useGetAllLeaveForApprovalsQuery } from '../../../../Api/leaveApplicationApi';
import { MainLoader } from '../../../Common/Index';
import LeaveForApprovalsTable from './LeaveForApprovalsTable';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import signalRService from '../../../../Helpers/SignalR/SignalRService';
interface props{
    userDetails:EmployeeUserModel
}
function LeaveForApprovalsQuery({userDetails}:props) {
 const [loading, setLoading] = useState(false);
 const [leaveForApprovalsData, setLeaveForApprovalsData] = useState<leaveApplicationModel[]>([])
 const [filters, setFilters] = useState({ 
   searchString: "",
   fromDate:"",
   toDate:"",
   statusId:0,
   leaveTypeId:0,
   employeeId:userDetails.employeeId
 });
 
 const [totalRecords, setTotalRecords] = useState(0);
 const [pageOptions, setPageOptions] = useState({
     pageNumber: 1,
     pageSize: 20,
 });
 const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);
 
 const [apiFilters, setApiFilters] = useState({
   searchString: "",
   fromDate:"",
   toDate:"",
   statusId:0,
   leaveTypeId:0,
   employeeId:userDetails.employeeId
 });
    const {data, isLoading, refetch} = useGetAllLeaveForApprovalsQuery
        ({
         ...(apiFilters && {
            employeeId:apiFilters.employeeId,
            leaveTypeId:apiFilters.leaveTypeId,
            statusId:apiFilters.statusId,
            pageNumber: pageOptions.pageNumber,
            pageSize: pageOptions.pageSize,
            searchString: apiFilters.searchString,
            fromDate:apiFilters.fromDate,
            toDate:apiFilters.toDate,
         }),
    });

  useEffect(() => {
    const handleMessage = (message: any) => {
     //  console.log("Received message:", message);
      if (message?.message == "SendMessageForLeaveApproval") {
          //console.log("refetch update")
          refetch();
      }
    };
    signalRService.onReceiveMessageLeaveApprovalUpdate(handleMessage);
    return () => {
      //signalRService.stopConnection();
  };
}, [refetch]);

  useEffect(() =>{
      setLoading(true);
        if(data && !isLoading){
            //console.log(data);
            setLeaveForApprovalsData(data?.result);
        }
      setLoading(false);
  },[data]);

    const getPageDetails = () => {
        const dataStartNumber =
          (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
        const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;
    
        return `${dataStartNumber}
                 - 
                ${
                  dataEndNumber < totalRecords ? dataEndNumber : totalRecords
                } of ${totalRecords}`;
      };
      const handlePageOptionChange = (direction: string, pageSize?: number) => {
        if (direction === "prev") {
          setPageOptions({ pageSize: currentPageSize, pageNumber: pageOptions.pageNumber - 1 });
        } else if (direction === "next") {
          setPageOptions({ pageSize: currentPageSize, pageNumber: pageOptions.pageNumber + 1 });
        } else if (direction === "change") {
          setPageOptions({
            pageSize: pageSize ? pageSize : 5,
            pageNumber: 1,
          });
        }
      };
    
      const handleFilterChanged = () => {
        setApiFilters({
          searchString: filters.searchString,
          fromDate:filters.fromDate ?? "",
          toDate:filters.toDate ?? "", 
          statusId:filters.statusId,
          leaveTypeId:filters.leaveTypeId,
          employeeId:filters.employeeId
        });
      };
    
      const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let processedValue: any = value;
        setFilters((prev) => ({
          ...prev,
          [name]: processedValue
        }));
      };

    
  return (
    <div>
  <div className="row g-2 align-items-end mb-3">

        {/* From Date */}
        <div className="col-md-3">
          <label htmlFor="fromDate" className="form-label">
            From Date
          </label>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            name="fromDate"
            onChange={handleUserInput}
          />
        </div>

        {/* To Date */}
        <div className="col-md-3">
          <label htmlFor="toDate" className="form-label">
            To Date
          </label>
          <input
            type="date"
            id="toDate"
            className="form-control"
            name="toDate"
            onChange={handleUserInput}
          />
        </div>

        {/* Search */}
        <div className="col-md-5">
          <label htmlFor="searchString" className="form-label">
            Search
          </label>
          <input
            type="text"
            id="searchString"
            className="form-control"
            placeholder="Search here..."
            name="searchString"
            onChange={handleUserInput}
          />
        </div>

        {/* Search Button */}
        <div className="col-md-1">
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={handleFilterChanged}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>

      </div>

        {
            !loading ? <LeaveForApprovalsTable 
            leaveForApprovalsData={leaveForApprovalsData} 
            userDetails={userDetails}
                /> :<MainLoader/>
        }

            <div className="d-flex mx-5 justify-content-end align-items-center">
                <div>Rows per page: </div>
                <div>
                  <select
                    className="form-select mx-2"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      handlePageOptionChange("change", Number(e.target.value));
                      setCurrentPageSize(Number(e.target.value));
                    }}
                    style={{ width: "80px" }}
                    value={currentPageSize}
                  > <option>10</option>
                    <option>20</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
        
                  </select>
                </div>
                <div className="mx-2">{getPageDetails()}</div>
                <button
                  onClick={() => handlePageOptionChange("prev")}
                  disabled={pageOptions.pageNumber === 1}
                  className="btn btn-outline-primary px-3 mx-2"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <button
                  onClick={() => handlePageOptionChange("next")}
                  disabled={
                    pageOptions.pageNumber * pageOptions.pageSize >= totalRecords
                  }
                  className="btn btn-outline-primary px-3 mx-2"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
    </div>
  )

}

export default LeaveForApprovalsQuery