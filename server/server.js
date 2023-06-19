const express = require("express")

const userRoutes = require("./routes/userRoutes")
const organizationRoutes = require("./routes/organizationRoutes")
const revenueRecordRoutes = require("./routes/revenueRecordRoutes")
const timeRecordRoutes = require("./routes/timeRecordRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const dashBoardRoutes = require("./routes/dashBoardRoutes")
const connectDB = require("./config/db")
const basicAuth = require("./middleware/basicAuth")
const cors = require("cors")






const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


let count = 0
app.use((req,res,next)=>{
    count++
    console.log(`Request number ${count}`)
    next()
}
)

app.use('/users',userRoutes)
app.use('/organizations',basicAuth,organizationRoutes)
app.use('/revenueRecords',basicAuth,revenueRecordRoutes)
app.use('/timeRecords',basicAuth,timeRecordRoutes)
app.use('/employees',basicAuth,employeeRoutes)
app.use('/dashboard',basicAuth,dashBoardRoutes)



const PORT = process.env.SERVER_PORT
app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is listening to port ${PORT}`)
})