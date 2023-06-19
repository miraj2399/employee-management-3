import React, { useEffect } from "react";
import { signupUser,loginUser } from "../services/AuthService";
import { getAllEmployees,getEmployeeById,createEmployee } from "../services/EmployeeService";
import Cookies from "js-cookie";
import { SignInPage } from "./SignInPage";
export function Settings() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [token,setToken] = React.useState("")
    const [employees,setEmployees] = React.useState([])
    const [id,setId] = React.useState("")
    const [employee,setEmployee] = React.useState({})

    return (
        <>
        <h1>Settings</h1>
        <form onSubmit={(e)=>{
            e.preventDefault();
            loginUser(username,password)
            .then((response)=>{
                console.log("response",response)
            }).then(()=>{
                getAllEmployees()
                .then((response)=>{
                    setEmployees(response.data)
                })
            })
        }}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
        <h1>Token {token}</h1>
        <h1>{process.env.REACT_APP_API_URL}</h1>
        <body>
            {JSON.stringify(employees)}
            <h1>Get Employees by id</h1>
            <form onSubmit={(e)=>{
                e.preventDefault();
                getEmployeeById(id)
                .then((response)=>{
                    setEmployee(response.data)
                }
                )
            }}>
                <input type="text" name="id" id="id" value={id} onChange={(e)=>setId(e.target.value)} />
                <button type="submit">Get Employee</button>
            </form>
            <h5>{JSON.stringify(employee)}</h5>

            <h1>Create new employee</h1>
            <form onSubmit={(e)=>{
                e.preventDefault();
                createEmployee(employee)
                .then((response)=>{
                    setEmployee(response.data)
                }
                )
            }
            }>
                <input type="text" placeholder="employee number" name="name" id="name" value={employee.employeeNumber} onChange={(e)=>setEmployee({...employee,employeeNumber:e.target.value})} />
                <input type="text" placeholder="firstName" name="name" id="name" value={employee.firstName} onChange={(e)=>setEmployee({...employee,firstName:e.target.value})} />
                <input type="text" placeholder="lastName"name="name" id="name" value={employee.lastName} onChange={(e)=>setEmployee({...employee,lastName:e.target.value})} />
                <input type="text" placeholder="contact" name="name" id="name" value={employee.contact} onChange={(e)=>setEmployee({...employee,contact:e.target.value})} />
                <input type="text" placeholder="hourly rate" name="name" id="name" value={employee.hourlyRate} onChange={(e)=>setEmployee({...employee,hourlyRate:e.target.value})} />
                <button type="submit">Create Employee</button>
            </form>
            <SignInPage />

        </body>
        </>

    );
}