import { Grid } from "@mui/material";
import "./styles/YesterdayAtAGlanceCard.css";

export const  YesterdayAtAGlanceCard = (props) => {
  const { revenueWage } = props;
  console.log("data",revenueWage);
  const data = revenueWage;
  if (data.length<2) {
    return <div>Not enough data</div>
  }
  
  const latestDate = data[0].date
  const latestRevenue = data[0].revenue.toFixed(2)
  const latestLaborCost = data[0].wage.toFixed(2)
  const latestProfit = (latestRevenue - latestLaborCost).toFixed(2)

  const previousDate = data[1].date
  const previousRevenue = data[1].revenue.toFixed(2)
  const previousLaborCost = data[1].wage.toFixed(2)
  const previousProfit = (previousRevenue - previousLaborCost).toFixed(2)

  const revenueChange = latestRevenue - previousRevenue
  const laborCostChange = latestLaborCost - previousLaborCost
  const profitChange = latestProfit - previousProfit

  const revenueChangePercentage = (revenueChange / previousRevenue).toFixed(4)*100
  const laborCostChangePercentage = (laborCostChange / previousLaborCost).toFixed(4)*100
  const profitChangePercentage = (profitChange / previousProfit).toFixed(4)*100


  return (
    <>
       <div class="container">
          <div >
            <p>On <span class ="date">{new Date(latestDate).toDateString()}</span> revenue was {
              latestRevenue>=previousRevenue? <span class="revenue-green">{latestRevenue}</span>:<span class="revenue-red">{latestRevenue}</span>
            } compared to <span class ="date">{new Date(previousDate).toDateString()}</span> revenue of {previousRevenue<= latestRevenue?<span class="revenue-red">{previousRevenue}</span>:<span class="revenue-green">{previousRevenue}</span>}</p>
            </div>
            <div>
              
              <h3 class="center-text">Revenue Change &nbsp;
              {revenueChange>=0? <span class="revenue-green">{Math.abs(revenueChange.toFixed(2))} ({ Math.abs(revenueChangePercentage.toFixed(2))}%)</span>:<span class="revenue-red">{Math.abs(revenueChange.toFixed(2))} ({ Math.abs(revenueChangePercentage.toFixed(2))}%)</span>}
              </h3>
             
              </div>
              <div>
            <p>On <span class ="date">{new Date(latestDate).toDateString()}</span> labor cost was
            {
              latestLaborCost>=previousLaborCost? <span class="revenue-red">{latestLaborCost}</span>:<span class="revenue-green">{latestLaborCost}</span> 
            } compared to <span class ="date">{new Date(previousDate).toDateString()}</span> labor cost of {previousLaborCost<= latestLaborCost?<span class="revenue-green">{previousLaborCost}</span>:<span class="revenue-red">{previousLaborCost}</span>}</p>
            </div>
            <div>
              <h3 class="center-text">Labor Cost Change &nbsp;
              {laborCostChange>=0? <span class="revenue-red">{Math.abs(laborCostChange.toFixed(2))} ({Math.abs(laborCostChangePercentage.toFixed(2))}%)</span>:<span class="revenue-green">{Math.abs(laborCostChange.toFixed(2))} ({ Math.abs(laborCostChangePercentage.toFixed(2))}%)</span>}
              </h3>
              </div>


              <div>
            <p>On <span class ="date">{new Date(latestDate).toDateString()}</span> profit was &nbsp;
            {
              latestProfit>=previousProfit? <span class="revenue-green">{latestProfit}</span>:<span class="revenue-red">{latestProfit}</span>
            } compared to <span class ="date">{new Date(previousDate).toDateString()}</span> profit of &nbsp;{previousProfit<= latestProfit?<span class="revenue-red">{previousProfit}</span>:<span class="revenue-green">{previousProfit}</span>}</p>
            </div>
            <div>
              <h3 class="center-text">Profit Change &nbsp;
              {profitChange>=0? <span class="revenue-green">{Math.abs(profitChange.toFixed(2))} ({Math.abs(profitChangePercentage.toFixed(2))}%)</span>:<span class="revenue-red">{Math.abs(profitChange.toFixed(2))} ({ Math.abs(profitChangePercentage.toFixed(2))}%)</span>}
              </h3>
              </div>

        </div>

              

          
      </>
  );
}