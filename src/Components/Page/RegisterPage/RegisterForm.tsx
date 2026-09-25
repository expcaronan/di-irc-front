import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import dropdownListDto from '../../../Interfaces/dropdownListDto';
import { useGetEmpDetailsDropdownListQuery, useRegisterUserEmpMutation } from '../../../Api/userEmpApi';
import apiResponse from '../../../Interfaces/apiResponse';
import { toast } from 'react-toastify';
import departmentModel from '../../../Interfaces/BaseModel/departmentModel';
import designationModel from '../../../Interfaces/BaseModel/designationModel';
import rankModel from '../../../Interfaces/BaseModel/rankModel';
import roleModel from '../../../Interfaces/BaseModel/roleModel';
interface props{
    dropdownListData:dropdownListDto
}
function RegisterForm({dropdownListData}:props) {
    //console.log(dropdownListData);
    const navigate = useNavigate();
    const [dropdownList, setDropdownList] = useState<dropdownListDto>();
    const [createUserEmp] = useRegisterUserEmpMutation();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
    firstName:"",
    lastName:"",
    birthDay:new Date().toISOString().split('T')[0],
    dateHired:new Date().toISOString().split('T')[0],
    isActive:true,
    passwordHash:"",
    userName:"",
    email:"",
    departmentId:0,
    designationId:0,
    roleId:0,
    rankId:0,
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
        const response:apiResponse =  await createUserEmp(input) 
        if(response.data?.isSuccess == true){
                toast.success('Account Created Successfully!', {
                    position: "top-right", 
                    autoClose: 5000, 
                  });
            navigate("/login");
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
      <div className="container mt-4">
      <h3>Registration Form</h3>
        <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
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
            type="password"
            name="passwordHash"
            className="form-control"
            value={input.passwordHash}
            onChange={handleUserInput}
            required
          />
        </div>

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
           <label htmlFor="recipient-name" className="col-form-label">Select Designation</label>
            <select
              required
              className="form-group form-select"
              name='designationId'
              value={input.designationId}
              onChange={handleUserInput}
              >
              <option value="">-=Department=-</option>
              {dropdownListData.designations?.map((option: designationModel, index: number) => (
              <option key={option.id} value={option.id}>
                  {option.designationName}
              </option>
              ))}
          </select>
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
         
            <label htmlFor="recipient-name" className="col-form-label">Select Roles</label>
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
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
        </form>
    </div>
    </div>
 
  )
}

export default RegisterForm