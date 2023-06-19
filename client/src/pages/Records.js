import { useEffect,useState } from "react"

import { getAllTimeRecords } from "../services/TimeRecordService";
import { RecordDataGrid } from "../components/RecordDataGrid";

export function Records(){
    const [records, setRecords] = useState([])

    useEffect(()=>{
        try{
            const response =  getAllTimeRecords().then((response)=>{
                if (response.status === 200) {
                    const records = response.data;
                    records.forEach(record => {
                        // get the difference between clockIn and clockOut in hh:mm format
                        const cTime = Math.floor((new Date(record.clockOut) - new Date(record.clockIn)) / 60000);
                        record.clockTime = `${Math.floor(cTime / 60)}:${cTime % 60}`;
                        record.wageAccured = (record.employee.hourlyRate * cTime / 60).toFixed(2);
                    });
                    setRecords(response.data);
                }
            }).catch((error)=>{
                console.error(error);
            })
            
        }catch(error){
            console.error(error);
        }

    },[])

    return (
        <div>
            <RecordDataGrid records={records} setRecords={setRecords}/>
        </div>
    )
}