const {getLatestTimeRecords,searchTimeRecords} = require("./timeRecordController")
const {getLatestRevenueRecords} = require("./revenueRecordController")
const {getEmployeeById} = require("./employeeController")

async function getDashBoardHandler(req,res){
    try{
    const organizationId = req.organizationId
    let {latestTimeRecordsDays, latestRevenueDays} = req.body
    if (!organizationId){
        return res.status(400).send({message:"organizationId is required!"})
    }
    else{
        if (!latestTimeRecordsDays){
            latestTimeRecordsDays = 7
        }
        if (!latestRevenueDays){
            latestRevenueDays = 7
        }
        const timeRecords = await getLatestTimeRecords(organizationId,latestTimeRecordsDays)
        const revenueRecords = await getLatestRevenueRecords(organizationId,latestRevenueDays)
        const revenueWage = await getLatest30daysRevenueVsWage(organizationId)
        return res.status(200).send({timeRecords:timeRecords,revenueRecords:revenueRecords,revenueWage:revenueWage})

    }
    } catch(err){
        console.log(err)
        return res.status(500).send({message:err.message})
    }

}

async function getLatest30daysRevenueVsWage(organizationId) {
    try {
      const revenueRecords = await getLatestRevenueRecords(organizationId, 30);
      const processedTimeRecordIds = new Set(); // Set to store processed time record IDs
      
      const revenueWagePromises = revenueRecords.map(async (revenueRecord) => {
        let totalWage = 0;
        const date = new Date(revenueRecord.date);
        const previousDate = new Date(date);
        previousDate.setDate(date.getDate() - 1);
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
  
        
        const timeRecords = await searchTimeRecords(organizationId, previousDate, nextDate);
    
        for (const timeRecord of timeRecords) {
          // Check if time record ID has already been processed
          if (processedTimeRecordIds.has(timeRecord.id)) {
            continue; // Skip the time record if already processed
          }
  
          processedTimeRecordIds.add(timeRecord.id); // Add time record ID to processed set
  
          const workHours = (timeRecord.clockOut - timeRecord.clockIn) / (1000 * 60 * 60);
          const employee = await getEmployeeById(organizationId, timeRecord.employee);
          totalWage += workHours * employee.hourlyRate;
        }
  
        return { date: date, wage: totalWage, revenue: revenueRecord.amount };
      });
  
      const revenueWage = await Promise.all(revenueWagePromises);
      return revenueWage;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  


module.exports = {
    getDashBoardHandler
}