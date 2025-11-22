// MUI
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";

// React icons
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";

// react imports
import { useContext } from "react";

// My Context
import { SearchTransactionToggleContext } from "../Context/MyContext";

const SearchBar = () => {
  const IncomeValues = [
    "Salary",
    "Business",
    "Freelance",
    "Investments",
    "Gifts",
    "Other",
  ];
  const ExpenseValues = [
    "Food",
    "Rent",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Transportation",
    "Travel",
    "Healthcare",
    "Other",
  ];
  const IncomeDisplay = IncomeValues.map((i, index) => {
    return (
      <MenuItem key={index} value={i}>
        {i}
      </MenuItem>
    );
  });
  const ExpenseDisplay = ExpenseValues.map((i, index) => {
    return (
      <MenuItem key={index} value={i}>
        {i}
      </MenuItem>
    );
  });

  const { TrackerSearch, setTrackerSearch } = useContext(
    SearchTransactionToggleContext
  );
  return (
    <div className="bg-[#e0fff5] rounded-xl flex flex-wrap items-baseline my-6 shadow-lg px-5 py-4 justify-between">
      <div className="flex flex-wrap items-center gap-2 lg:mb-0 mb-4">
        <ButtonGroup disableElevation aria-label="Disabled button group">
          <Button
            variant={TrackerSearch === "Expense" ? "contained" : "outlined"}
            onClick={() => setTrackerSearch("Expense")}
          >
            Expense
          </Button>
          <Button
            variant={TrackerSearch === "Income" ? "contained" : "outlined"}
            onClick={() => setTrackerSearch("Income")}
          >
            Income
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-wrap items-center gap-4 ">
        <TextField
          id="outlined-basic"
          label={
            <div className="flex items-center gap-1.5">
              <IoIosSearch /> Search transaction...
            </div>
          }
          variant="outlined"
          size="small"
        />

        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="demo-simple-select-label">
            <div className="flex items-center gap-1.5">
              <FaFilter /> All Categories
            </div>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
            label={
              <div className="flex items-center gap-1.5">
                <FaFilter /> All Categories
              </div>
            }
          >
            {TrackerSearch === "Expense" ? ExpenseDisplay : IncomeDisplay}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<HiOutlineDownload />}
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
