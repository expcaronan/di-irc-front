import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dropdownListDto from '../../../../Interfaces/dropdownListDto';
import { employeeUserBaseModel } from '../../../../Interfaces/BaseModel/employeeUserBaseModel';
import { useUdpateUserEmpMutation } from '../../../../Api/userEmpApi';
import apiResponse from '../../../../Interfaces/apiResponse';
import departmentModel from '../../../../Interfaces/BaseModel/departmentModel';
import designationModel from '../../../../Interfaces/BaseModel/designationModel';
import rankModel from '../../../../Interfaces/BaseModel/rankModel';
import roleModel from '../../../../Interfaces/BaseModel/roleModel';
import groupModel from '../../../../Interfaces/BaseModel/groupModel';

interface props{
    dropdownListData:dropdownListDto,
    employeeData:employeeUserBaseModel
}
function UpdateForm({dropdownListData,employeeData}:props) {
    //console.log(employeeData);
    const navigate = useNavigate();
    const [dropdownList, setDropdownList] = useState<dropdownListDto>();
    const [updateUserEmp] = useUdpateUserEmpMutation();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
    id:employeeData.id,
    userId:employeeData?.user?.id,
    firstName:employeeData.firstName,
    lastName:employeeData.lastName,
    birthDay:employeeData.birthDay.split("T")[0],
    dateHired:employeeData.dateHired.split("T")[0],
    isActive:employeeData.isActive,
    passwordHash:"",
    userName:employeeData?.user?.userName,
    email:employeeData?.user?.email,
    departmentId:employeeData.departmentId,
    designationId:employeeData.designationId,
    roleId:employeeData.roleId,
    rankId:employeeData.rankId,
    groupId:employeeData.groupId,
  });


const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  let processedValue: any = value;
  setInput((prev) => ({
    ...prev,
    [name]: processedValue
  }));
};

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
      if (loading) return; // Prevent multiple clicks
    setLoading(true);
     try {
        const response:apiResponse =  await updateUserEmp(input) 
        if(response.data?.isSuccess == true){
                toast.success('Account Created Successfully!', {
                    position: "top-right", 
                    autoClose: 5000, 
                  });
            navigate("/employee/list");
            }else if(response.data?.exist == true){
              toast.error('Question already exist!', {
                position: "top-right", 
                autoClose: 5000, 
              });
            }
            else{
              toast.error('Something went wrong!', {
                  position: "top-right", 
                  autoClose: 5000, 
                });
            }
          
        } catch (error) {
          console.error('Error:', error);
         
        } finally {
          setLoading(false);
        }
 }
  return (
    <div>
      <div className="container mt-4 pb-5">
      <h3>Update Form</h3>


        <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="row">
            <div className='col'>
              
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            placeholder="Enter First Name"
            type="text"
            name="firstName"
            className="form-control"
            value={input.firstName}
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
          placeholder="Enter Last Name"
            type="text"
            name="lastName"
            className="form-control"
            value={input.lastName}
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            placeholder="Enter Email"
            type="email"
            name="email"
            className="form-control"
            value={input.email}
            onChange={handleUserInput}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">UserName</label>
          <input
            placeholder="Enter UserName"  
            type="text"
            name="userName"
            className="form-control"
            value={input.userName}
            onChange={handleUserInput}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            name="passwordHash"
            className="form-control"
            value={input.passwordHash}
            onChange={handleUserInput}
          />
        </div>
 <div className="mb-3">
          <label htmlFor="birthDay" className="col-form-label">Birthday</label>
          <input
            type="date"
            className="form-control datepicker"
            name="birthDay"
            required
            value={input.birthDay}
            onChange={handleUserInput}
          />
        </div>



            </div>
            <div className='col'>
               <div className="mb-3">
         <label htmlFor="recipient-name" className="col-form-label">Select Department</label>
            <select
              required
              className="form-group form-select"
              name='departmentId'
              value={input.departmentId}
              onChange={handleUserInput}
              >
              <option value="">-=Department=-</option>
              {dropdownListData.departments?.map((option: departmentModel, index: number) => (
              <option key={option.id} value={option.id}>
                  {option.departmentName}
              </option>
              ))}
          </select>
  </div>


  <div className="mb-3">
           <label htmlFor="recipient-name" className="col-form-label">Select Designation</label>
            <select
              required
              className="form-group form-select"
              name='designationId'
              value={input.designationId}
              onChange={handleUserInput}
              >
              <option value="">-=Designation=-</option>
              {dropdownListData.designations?.map((option: designationModel, index: number) => (
              <option key={option.id} value={option.id}>
                  {option.designationName}
              </option>
              ))}
          </select>
          </div>

          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Select Ranks</label>
            <select
              required
              className="form-group form-select"
              name='rankId'
              value={input.rankId}
              onChange={handleUserInput}
              >
              <option value="">-=Ranks=-</option>
              {dropdownListData.ranks?.map((option: rankModel, index: number) => (
              <option key={option.id} value={option.id}>
                  {option.rankName}
              </option>
              ))}
          </select>     
         </div>
            <label htmlFor="recipient-name" className="col-form-label">Select Role</label>
            <select
              required
              className="form-group form-select"
              name='roleId'
              value={input.roleId}
              onChange={handleUserInput}
              >
              <option value="">-=Roles=-</option>
              {dropdownListData.roles?.map((option: roleModel, index: number) => (
              <option key={option.id} value={option.id}>
                  {option.roleName}
              </option>
              ))}
          </select>     
           <label htmlFor="group" className="col-form-label">Select Group</label>
            <select
              required
              className="form-group form-select"
              name='groupId'
              value={input.groupId}
              onChange={handleUserInput}
              >
              <option value="">-=Groups=-</option>
              {dropdownListData.groups?.map((option: groupModel, index: number) => (
              <option key={option.id} value={option.id}>
                  {option.groupName}
              </option>
              ))}
          </select>     
  <div className="mb-3">
          <label htmlFor="birthDay" className="col-form-label">Hire Date</label>
          <input
            type="date"
            className="form-control datepicker"
            name="dateHired"
            required
            value={input.dateHired}
            onChange={handleUserInput}
          />
        </div>
            </div>
        </div>




       
      
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        </form>
    </div>
    </div>
 
  )
}

export default UpdateForm