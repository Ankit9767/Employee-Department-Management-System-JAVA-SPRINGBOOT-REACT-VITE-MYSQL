/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEmployee, listEmployees } from "../services/EmployeeService"

const ListEmployeesComponent = () => {

 const [employees , setEmployees ] = useState([])
 
 const navigator = useNavigate() ;

 useEffect(() => {
    getAllEmployees();
 } , [])

 function getAllEmployees(){

    listEmployees().then((Response) => {
        setEmployees(Response.data);
    }).catch(error => {
        console.log(error.response.data);
    })
 }

 function addNewEmployee(){
    navigator('/add-employee')
 }

 function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
 }

 function removeEmployee(id){
    console.log(id);

    deleteEmployee(id).then((response) => {
        getAllEmployees() ;
    })
    .catch(error => {
        console.error(error)
    })
 }

  return (
    <div className="container">

        <h2 className="text-center">List of Employees</h2>
        <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Employee_Id</th>
                    <th>Employee_firstName</th>
                    <th>Employee_lastName</th>
                    <th>Employee_Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateEmployee(employee.id)} >Update</button>
                                <button className="btn  btn-danger" onClick={() => removeEmployee(employee.id)}
                                    style={{marginLeft:'10px'}}
                                >Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    </div>
  )
}

export default ListEmployeesComponent