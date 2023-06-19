import { Typography,Box,Grid, TextField, Button, TableCell,Table,TableHead,TableRow,TableBody,TableContainer, Tab} from "@mui/material";

import { useState ,useEffect,useRef} from "react";
import { CalculateClockTime } from "../functions/CalculateClockTime";
import { createTimeRecord } from "../services/TimeRecordService";
import { ConvertStringToTime } from "../functions/ConvertStringToTime";


export function Reports({employees:emps}){
    
    const f1 = useRef(null);
    const f2 =useRef(null);
    const f3 = useRef(null);

    const [records,setRecords] = useState([]);
    const [clockReportDate,setClockReportDate] = useState("");
    const [revenue,setRevenue] = useState(0);
    const[revenueReportDate,setRevenueReportDate] = useState("");

    let [newRecord,setNewRecord] = useState({
        "id":"",
        "firstName":"",
        "lastName":"",
        "employeeNumber":"",
        "clockIn":"",
        "clockOut":"",
        "clockTime":""
    });

    let [totalTime,setTotalTime] = useState(0);


    const handleEnter = (event,currentRef)=>{
        
        let refs = [f1,f2,f3];
        if (event.keyCode===13){
            let indexOfCurrentRef = refs.indexOf(currentRef)
        
            if (indexOfCurrentRef===(refs.length-1)){
                handleCalculate(event);
                refs[0].current.focus()
            }
            else{
                let nextRef = refs[(indexOfCurrentRef+1)%(refs.length)];
                nextRef.current.focus()
            }
        }
    }

    const updateRecordDB=(event)=>{
        // include only id,clockIn,clockOut
        const recordsToSend = records.map((record)=>{
            // assign the employee id to employee 
            const employee = emps.find((emp)=>emp.employeeNumber.toString()===record.employeeNumber.toString());
            record.employee = employee._id;
            alert(ConvertStringToTime(record.clockIn,clockReportDate));
            return {
                employee:record.employee,
                clockIn:ConvertStringToTime(record.clockIn,clockReportDate),
                clockOut:ConvertStringToTime(record.clockOut,clockReportDate),
                description:record.description?record.description:""
            }
        })

        createTimeRecord(recordsToSend).then((res)=>{
            alert("success");
        }
        ).catch((err)=>{
            alert(JSON.stringify(err));
        }
        )
        
    }


    const handleCalculate = (event) => {
        // check if the employee id is valid
        //alert(JSON.stringify(emps));
        alert(JSON.stringify(newRecord));
        const employee = emps.find((emp)=>emp.employeeNumber.toString()===newRecord.employeeNumber.toString());
        if (!employee){
            alert("invalid employee id");
            return;
        }
        newRecord.firstName = employee.firstName;
        newRecord.lastName = employee.lastName;
        newRecord.employeeNumber = employee.employeeNumber;
        // check if the clock in and clock out are valid
        if (newRecord.clockIn.length<3 || newRecord.clockIn.length>4 || newRecord.clockOut.length<3 || newRecord.clockOut.length>4|| parseInt(newRecord.clockIn)%100>59 || parseInt(newRecord.clockOut)%100>59|| parseInt(newRecord.clockIn)>2400 || parseInt(newRecord.clockOut)>2400){
            alert("invalid clock in or clock out");
            return;
        }
       newRecord.clockTime = CalculateClockTime(newRecord.clockIn,newRecord.clockOut)[0];
       setTotalTime(totalTime+CalculateClockTime(newRecord.clockIn,newRecord.clockOut)[1]);
       setRecords([...records,newRecord]);


    }
    

    return(
        <>
        <Box padding={2} sx={{
            
            minHeight:"100vh"
        }} >
        <Box padding={2}><Typography variant="h4">Report Clock-in Clock-out</Typography></Box>
        
        <Grid container sx={{
            // align button with textfield
            marginTop:0,
            marginBottom:5,
            padding:2,
            alignItems:"center",
            justifyContent:"center",
            spacing:2,
            
        }}>
            
            <Grid  item  sm={3} >
                <TextField size="small" fullWidth label="employee number" onChange={(e)=>{
                    setNewRecord({...newRecord,employeeNumber:e.target.value});
                }} inputRef={f1}
                onKeyDown={(event)=>{handleEnter(event,f1)}}
                value={newRecord.employeeNumber||""}
                ></TextField>
            </Grid>
            <Grid item sm={3}>
                <TextField  size="small" fullWidth label="Clock-in (hhmm)" onChange={(event)=>{
                    setNewRecord({...newRecord,clockIn:event.target.value});
                }} inputRef={f2}
                onKeyDown={(event)=>{handleEnter(event,f2)}}
                value={newRecord.clockIn||""}
                ></TextField>
            </Grid>
            <Grid item sm={3}>
                <TextField  size="small" fullWidth label="Clock-out (hhmm)" onChange={(event)=>{
                    setNewRecord({...newRecord,clockOut:event.target.value});
                }} inputRef={f3}
                onKeyDown={(event)=>{handleEnter(event,f3)}}
                value={newRecord.clockOut||""}
                ></TextField>
            </Grid>
            <Grid item sm={3}>
                <Box textAlign={"center"}>
                <Button onClick={(event)=>{handleCalculate(event)}}>Calculate</Button>
                </Box>
            </Grid>
                {
                    <Grid item sm={4}>
                        {newRecord.employeeNumber && <Typography variant="code" color="secondary">id: {newRecord.employeeNumber}</Typography>}
                        </Grid>
                    
                }
                {
                    
                    <Grid item sm={4}>{newRecord.clockIn&&<Typography variant="code" color="secondary">Clock Time:{newRecord.clockTime}</Typography>}</Grid>
                    
                }
                {
                    
                    <Grid item sm={4}>{totalTime&&<Typography variant="code" color="secondary">{"Total Time:"+ Math.floor(totalTime/60)+ " hour "+ totalTime%60+" minute" }</Typography>}</Grid>
                    
                }
            </Grid>
            { records.length>0&&
            <Box sx={{
                
                borderRadius: 2,
            }}>
            <TableContainer  sx={{padding:2}}>
                    <Table sx = {{minWidth:650,padding:3}}>
                        <TableHead>
                            <TableRow>
                                {
                                    [
                                        "Employee Number",
                                        "Name",
                                        "clockIn",
                                        "clockOut",
                                        "clockTime"
                                    ].map((key)=>
                                    (<TableCell>{key}</TableCell>)
                                    )
                                } 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
        
                                    records.map((emp)=>(
                                        <TableRow>
                                        <TableCell>{emp.employeeNumber}</TableCell>
                                        <TableCell>{emp.firstName+" "+emp.lastName}</TableCell>
                                        <TableCell>{emp.clockIn}</TableCell>
                                        <TableCell>{emp.clockOut}</TableCell>
                                        <TableCell>{emp.clockTime}</TableCell>
                                        </TableRow>
                                    ))
                                }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
}

                <Grid  container padding={2} alignItems={"center"} >
                    <Grid item sm={4}>
                    <TextField size="small" fullWidth label="Report Date(mmddyy)" 
                    onChange={(e)=>{setClockReportDate(e.target.value)}}></TextField>
                    </Grid>
                    <Grid item sm={4}>
                    <Box textAlign={"center"}>
                    <Button onClick={(event)=>{updateRecordDB(event)}}>Report</Button>
                    </Box>
                    </Grid>
                </Grid>

                <Box padding={2}><Typography variant="h4">Report Revenue</Typography></Box>

                <Grid container sx={{
            // align button with textfield
            marginTop:0,
            marginBottom:5,
            padding:2,
            alignItems:"center",
            justifyContent:"center",
            spacing:2,
            
        }}>
            
            <Grid  item  sm={4} >
                <TextField size="small" fullWidth label="Revenue" onChange={(e)=>{setRevenue(e.target.value)}}
                ></TextField>
            </Grid>
            <Grid  item  sm={4} >
                <TextField size="small" fullWidth label="Report Date(mmddyy)" onChange={(e)=>{setRevenueReportDate(e.target.value)}}></TextField>
            </Grid>
            <Grid item sm={4}>
                <Box textAlign={"center"}>
                <Button onClick={(event)=>{
                    fetch(`${process.env.REACT_APP_API_URL}/revenues`,{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            revenue:revenue,
                            date:revenueReportDate
                        })
                    }).then((res)=>{
                        return res.json();
                    }
                    ).catch((err)=>{
                        console.log(err);
                    })
                    

                }}>Report</Button>
                </Box>
            </Grid>
            </Grid>

        </Box>
        </>
    );
    }