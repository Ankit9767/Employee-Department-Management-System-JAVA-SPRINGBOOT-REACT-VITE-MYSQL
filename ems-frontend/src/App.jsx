
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DepartmentComponent from './components/DepartmentComponent'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeesComponent from './components/ListEmployeesComponent'

function App() {
 
  return (
    <>
      <BrowserRouter>
            <HeaderComponent></HeaderComponent>
            <Routes>
                <Route path='/' element={ <ListEmployeesComponent></ListEmployeesComponent> }></Route>

                <Route path='/employees' element = {  <ListEmployeesComponent></ListEmployeesComponent> }></Route>
                
                <Route path='/add-employee' element={ <EmployeeComponent></EmployeeComponent> }></Route>
            
                <Route path='/edit-employee/:id' element = { <EmployeeComponent></EmployeeComponent> }></Route>

                <Route path='/departments' element={ <ListDepartmentComponent></ListDepartmentComponent> }></Route>

                <Route path='/add-department' element = { <DepartmentComponent></DepartmentComponent> }></Route>

                <Route path='/edit-department/:id' element = { <DepartmentComponent></DepartmentComponent> }></Route>
            </Routes>
            
            <FooterComponent></FooterComponent>
      </BrowserRouter>
    </>
  )
}

export default App
