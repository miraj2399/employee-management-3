import React, { useState, useEffect } from "react";
import { getDashBoard } from "../services/DashBoardService";
import { LastXdaysRevenue } from "../components/LastXdaysRevenue";
import { LastXdaysTimeRecord } from "../components/LastXdaysTimeRecord";
import { RevenueVsLaborCost } from "../components/RevenueVsLaborCost";
import { YesterdayAtAGlanceCard } from "../components/YesterdayAtAGlanceCard";
import { Grid } from "@mui/material";
export function Dashboard() {
  const [settings, setDashboardSettings] = useState(
    JSON.parse(localStorage.getItem("dashboardSettings")) || {
      getLatestTimeRecordsByDays: 7,
      getLatestRevenueRecordsByDays: 7
    }
  );

  const [timeRecords, setTimeRecords] = useState([]);
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [revenueWage, setRevenueWage] = useState([]);

  useEffect(() => {
    /*
    getLatestTimeRecordsByDays(settings.getLatestTimeRecordsByDays)
      .then((response) => {
        setTimeRecords(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    getLatestRevenueRecordsByDays(settings.getLatestRevenueRecordsByDays)
      .then((response) => {
        setRevenueRecords(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

        */
      getDashBoard()
        .then((response) => {
            const {revenueRecords,timeRecords,revenueWage}=response.data;
            setTimeRecords(timeRecords);
            setRevenueRecords(revenueRecords);
            setRevenueWage(revenueWage);
            console.log(response.data);

            }
        )
        .catch((error) => {
            console.error(error);
        }
        );


  }
  , []);

  return (
    <div>
      
      <Grid container spacing={2}>

      <Grid item xs={12} sm={6}>
            <div
        className="head"
        style={{
            width: "fit-content",
            margin: "auto",
        }}
        >
        <h1
            style={{
            color: "green",
            }}
        >
           Revenue vs Labor
        </h1>
        </div>
            <div style={{ height: 400, width: '100%' }}>
            <RevenueVsLaborCost data={revenueWage} />
            </div>
            </Grid>

            <Grid item xs={12} sm={6}>
            <div
        className="head"
        style={{
            width: "fit-content",
            margin: "auto",
        }}
        >
        <h1
            style={{
            color: "green",
            }}
        >
           Latest Insights
        </h1>
        </div>
            <div style={{ height: 400, width: '100%' }}>
            
            {revenueWage&& <YesterdayAtAGlanceCard revenueWage={revenueWage} />}
            </div>
            </Grid>



            <Grid item xs={12} sm={12}>
            <LastXdaysRevenue revenueRecords={revenueRecords} />
            </Grid>


            <Grid item xs={12} sm={12}>
            <LastXdaysTimeRecord timeRecords={timeRecords} />
            </Grid>


           
            
      </Grid>
    </div>
  );
}
