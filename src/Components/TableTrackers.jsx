// React imports
import { useContext } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles"; // Import styled

// React Icons
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";

// My Context
import {
  ExpenseIncomeArrayContext,
  SearchTransactionToggleContext,
} from "../Context/MyContext";

// A custom styled component for the dark header row
const StyledTableRowHeader = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#87CBB9",
  "& .MuiTableCell-root": {
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
    fontWeight: "bold",
    padding: "16px",
  },
}));

function createData(id, name, calories, fat, carbs) {
  return { id, name, calories, fat, carbs };
}

export default function TableTracker() {
  // Context
  const { ExpenseIncomeArray, setExpenseIncomeArray } = useContext(
    ExpenseIncomeArrayContext
  );
  const rows = [];

  // Delete A row function
  function handleDelete(id) {
    let updated = ExpenseIncomeArray.filter((i) => i.uniqueId !== id);
    setExpenseIncomeArray(updated);
  }

  // Row Desplay according to type
  const { TrackerSearch } = useContext(SearchTransactionToggleContext);
  const ExpenseArray = ExpenseIncomeArray.filter((a) => a.type === "Expense");
  const IncomeArray = ExpenseIncomeArray.filter((a) => a.type === "Income");

  if (
    ExpenseIncomeArray.length > 0 &&
    TrackerSearch === "Expense" &&
    ExpenseArray.length > 0
  ) {
    ExpenseArray.map((i) => {
      rows.push(
        createData(i.uniqueId, i.desc, i.category, i.date, `$${i.amount}`)
      );
    });
  } else if (
    ExpenseIncomeArray.length > 0 &&
    TrackerSearch === "Income" &&
    IncomeArray.length > 0
  ) {
    IncomeArray.map((i) => {
      rows.push(
        createData(i.uniqueId, i.desc, i.category, i.date, `$${i.amount}`)
      );
    });
  } else {
    rows.push(createData("ids", "No Data", "-", "-", "-"));
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: 650,
        borderRadius: "12px",
        boxShadow: 3,
        marginBottom: "36px",
      }}
    >
      <Table
        sx={{
          minWidth: 650,
          backgroundColor: "#e0fff5",
        }}
        size="small"
      >
        <TableHead>
          {/* Use the new styled component for the header row */}
          <StyledTableRowHeader>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">
              <div className="pr-5">Actions</div>
            </TableCell>
          </StyledTableRowHeader>
        </TableHead>
        {/* The size="small" prop on the Table component (above) handles the smaller size */}
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">
                <div>
                  {/* Edit button maybe in the future */
                  /* <IconButton
                    color="primary"
                    onClick={() => {
                      console.log("Edit the row with id:" + row.id);
                    }}
                  >
                    <MdEdit />
                  </IconButton> */}
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <MdDeleteForever />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
