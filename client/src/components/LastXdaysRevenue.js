import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Grid} from '@mui/material';
import {styled } from '@mui/material/styles';
export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #D3D3D3;
  }
`;

export function LastXdaysRevenue(props) {
    
    const { revenueRecords } = props;
    return (
        <div>
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
         Latest Revenues
        </h1>
      </div>
            <TableContainer component={Paper}>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>Revenue</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Notes</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {revenueRecords&&revenueRecords.map((revenueRecord) => (
                            <TableRow key={revenueRecord._id}>
                                <TableCell>{revenueRecord.amount}</TableCell>
                                <TableCell>{revenueRecord.date}</TableCell>
                                <TableCell>{revenueRecord.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        
        </div>
    )

}
