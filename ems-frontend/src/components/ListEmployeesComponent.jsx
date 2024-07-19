import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { getAllDepartments } from "../services/DepartmentService";

const ListEmployeesComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const fetchEmployees = () => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    };

    const fetchDepartments = () => {
        getAllDepartments()
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
            });
    };

    const addNewEmployee = () => {
        navigator("/add-employee");
    };

    const updateEmployee = (id) => {
        navigator(`/edit-employee/${id}`);
    };

    const removeEmployee = (id) => {
        deleteEmployee(id)
            .then(() => {
                fetchEmployees();
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    };

    return (
        <div className="container">
            <h2 className="text-center">List of Employees</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
                Add Employee
            </button>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                {employee.departmentId &&
                                    departments
                                        .filter((dept) => dept.id === employee.departmentId)
                                        .map((dept) => dept.departmentName)}
                            </td>
                            <td>
                                <button
                                    className="btn btn-info"
                                    onClick={() => updateEmployee(employee.id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => removeEmployee(employee.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeesComponent;








// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { deleteEmployee, listEmployees } from "../services/EmployeeService"

// const ListEmployeesComponent = () => {

//  const [employees , setEmployees ] = useState([])
 
//  const navigator = useNavigate() ;

//  useEffect(() => {
//     getAllEmployees();
//  } , [])

//  function getAllEmployees(){

//     listEmployees().then((Response) => {
//         setEmployees(Response.data);
//     }).catch(error => {
//         console.log(error.response.data);
//     })
//  }

//  function addNewEmployee(){
//     navigator('/add-employee')
//  }

//  function updateEmployee(id){
//     navigator(`/edit-employee/${id}`)
//  }

//  function removeEmployee(id){
//     console.log(id);

//     deleteEmployee(id).then((response) => {
//         getAllEmployees() ;
//     })
//     .catch(error => {
//         console.error(error)
//     })
//  }

//   return (
//     <div className="container">

//         <h2 className="text-center">List of Employees</h2>
//         <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
//         <table className="table table-striped table-bordered">
//             <thead>
//                 <tr>
//                     <th>Employee_Id</th>
//                     <th>Employee_firstName</th>
//                     <th>Employee_lastName</th>
//                     <th>Employee_Email</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     employees.map(employee =>
//                         <tr key={employee.id}>
//                             <td>{employee.id}</td>
//                             <td>{employee.firstName}</td>
//                             <td>{employee.lastName}</td>
//                             <td>{employee.email}</td>
//                             <td>
//                                 <button className="btn btn-info" onClick={() => updateEmployee(employee.id)} >Update</button>
//                                 <button className="btn  btn-danger" onClick={() => removeEmployee(employee.id)}
//                                     style={{marginLeft:'10px'}}
//                                 >Delete</button>
//                             </td>
//                         </tr>
//                     )
//                 }
//             </tbody>
//         </table>

//     </div>
//   )
// }

// export default ListEmployeesComponent
