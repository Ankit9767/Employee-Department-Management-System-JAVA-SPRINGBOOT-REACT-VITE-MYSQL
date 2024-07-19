/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllDepartments } from "../services/DepartmentService"
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService"

const EmployeeComponent = () => {

   const [firstName , setFirstName] = useState('') 
   const [lastName , setLastName] = useState('')
   const [email , setEmail] = useState('')

   const [departmentId , setDepartmentId] = useState('')
   const [departments , setDepartments] = useState([])

   useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data)
        }).catch(error => {
            console.error(error);
        })
   }, [])

   const {id} = useParams();

   const [errors , setErrors] = useState(
    {
        firstName:'',
        lastName:'',
        email:'',
        department:''
    }
   )

  const navigator =  useNavigate()

  useEffect(() => {

        getEmployee(id).then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmail(response.data.email)
        })
        .catch(error => {
            console.error(error) ;
        })
  } , [id])

    function saveOrUpdateEmployee(event) {

        event.preventDefault();

        if(validateForm()){

        const employee = {firstName , lastName , email , departmentId }
        console.log(employee)

            if(id){
                updateEmployee(id , employee).then((response) =>{
                    console.log(response.data);
                    navigator('/employees')
                })
                .catch(error => {
                    console.error(error)
                })
            }
            else{
                createEmployee(employee).then((response) =>{
                    console.log(response.data);
                    navigator('/employees')
                })
                .catch(error =>{
                    console.error(error)
                })
            }

        }

        }

        function validateForm(){
            
            let valid = true ;

            const errorsCopy = {... errors}

            if(firstName.trim()){
                errorsCopy.firstName=''
            }
            else{
                errorsCopy.firstName = 'First Name is Required'; 
                valid = false ;
            }

            if(lastName.trim()){
                errorsCopy.lastName=''
            }
            else{
                errorsCopy.lastName = 'Last Name is Required'; 
                valid = false ;
            }

            if(email.trim()){
                errorsCopy.email=''
            }
            else{
                errorsCopy.email = 'Email is Required'; 
                valid = false ;
            }

            setErrors(errorsCopy)

            return valid ;

        }

    function handleFirstName(event){
        setFirstName(event.target.value)
    }

    function handleLastName(event){
        setLastName(event.target.value)
    }

    function handleEmail(event){
        setEmail(event.target.value)
    }

    function pageTitle(){
        if(id){
          return <h2 className="text-center">Update Employee</h2>
        }
        else{
           return <h2 className="text-center">Add Employee</h2>
        }
    }

  return (
    <div className="container">
        <br /> <br />
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {
                pageTitle() 
              }
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label className="form-label">First Name : </label>
                            <input type="text" 
                            placeholder="Enter Employee First Name " 
                            name="firstName" 
                            value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid' : '' }`}
                            onChange={handleFirstName} 
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Last Name : </label>
                            <input type="text" 
                            placeholder="Enter Employee Last Name " 
                            name="lastName" 
                            value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid' : '' }`}
                            onChange={handleLastName} 
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Email : </label>
                            <input type="text" 
                            placeholder="Enter Employee Email " 
                            name="email" 
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : '' }`}
                            onChange={handleEmail} 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="form-group mb-2">
                            <label className="form-label">Select Department : </label>
                           <select className={`form-control ${errors.department ? 'is-invalid' : '' }`} value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>

                            <option value="Select Department">Select Department</option>
                            
                            {
                                departments.map(department => 
                                        <option key={department.id} value={department.id} >{department.departmentName}</option>
                                )
                            } 

                           </select>
                            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                        </div>

                            <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
            
    </div>
  )
}

export default EmployeeComponent