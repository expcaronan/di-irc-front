import React, { useEffect, useState } from 'react'
import EmployeeUserModel from '../../../../Interfaces/EmployeeUserModel'
import { useGetAllApprovedTaskDocumentsWithAssignedDepartmentByIdQuery } from '../../../../Api/taskDocumentApi';
import { taskDocumentAssignedDepartmentBaseModel } from '../../../../Interfaces/BaseModel/taskDocumentAssignedDepartmentBaseModel';
import signalRService from '../../../../Helpers/SignalR/SignalRService';
import DocumentApprovedTable from './DocumentApprovedTable';
interface props{
  userDetails:EmployeeUserModel
  empToken:string
}
function DocumentApprovedQuery({userDetails,empToken}:props) {

const [filters, setFilters] = useState({ 
  searchString: "",
  fromDate:"",
  toDate:"",
});
const [totalRecords, setTotalRecords] = useState(0);
const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 10,
});
const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize);

const [apiFilters, setApiFilters] = useState({
    searchString: "",
    fromDate:"",
    toDate:"",
});
                                   
const {data, isLoading, refetch} = useGetAllApprovedTaskDocumentsWithAssignedDepartmentByIdQuery({
    ...(apiFilters && {
      pageNumber: pageOptions.pageNumber,
      pageSize: pageOptions.pageSize,
      searchString: apiFilters.searchString,
      fromDate:apiFilters.fromDate,
      toDate:apiFilters.toDate,
    }),
    id:userDetails.departmentId,  
  });


const [loading, setLoading] = useState(false);
const [taskDocumentList, setTaskDocumentList] = useState<taskDocumentAssignedDepartmentBaseModel[]>([])



useEffect(() => {
  const handleMessage = (message: any) => {
    console.log(message);

    if (message?.message !== "TaskDocumentApproved") {
      return;
    }

    const taskList = message.data as taskDocumentAssignedDepartmentBaseModel;

    setTaskDocumentList(previous => [
      taskList,
      ...previous.filter(item => item.id !== taskList.id)
    ]);
  };

  // Register the SignalR message handler
  signalRService.onReceiveMessage(handleMessage);

  return () => {
    // Clean up when the component unmounts
    signalRService.stopConnection();
  };
}, [taskDocumentList]);


useEffect(() =>{
    setLoading(true);
    if(data && !isLoading){
        setTaskDocumentList(data.result);
        setTotalRecords(data.totalCount)
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

      <DocumentApprovedTable documentList={taskDocumentList} employeeId={userDetails.employeeId}/>

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

export default DocumentApprovedQuery