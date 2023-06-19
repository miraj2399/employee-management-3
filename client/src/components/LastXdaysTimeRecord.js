import {Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Grid} from '@mui/material';
import {styled } from '@mui/material/styles';
export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    background-color: #D3D3D3;
  }
`;
export function LastXdaysTimeRecord(props) {
    const { timeRecords } = props;
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
           Latest Time Records
        </h1>
        </div>
            <TableContainer component={Paper}>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Clock in</TableCell>
                            <TableCell>Clock out</TableCell>
                            <TableCell>Notes</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {timeRecords&&timeRecords.map((timeRecord) => (
                            <TableRow key={timeRecord._id}>
                                <TableCell>{timeRecord.employee.firstName + " " + timeRecord.employee.lastName}</TableCell>
                                <TableCell>{timeRecord.clockIn}</TableCell>
                                <TableCell>{timeRecord.clockOut}</TableCell>
                                <TableCell>{timeRecord.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}