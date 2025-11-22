import { useContext, useState } from "react";

// MUI
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

// React icons
import { IoIosCloseCircleOutline } from "react-icons/io";

// Context
import {
  DialogToggleContext,
  ExpenseIncomeArrayContext,
} from "../Context/MyContext";

// UUID
import { v4 as uuidv4 } from "uuid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddingDialog() {
  //  Category MenuItems
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
  //

  // Toggle Dialog
  const { open, setOpen } = useContext(DialogToggleContext);
  const [Tracker, setTracker] = useState("Expense");
  //

  // Today's date
  let Time = new Date();
  const month = String(Time.getMonth() + 1).padStart(2, "0");
  const day = String(Time.getDate()).padStart(2, "0");
  let Today = Time.getFullYear() + "-" + month + "-" + day;
  //

  // New Transaction
  const DefaultTransaction = {
    uniqueId: uuidv4(),
    type: "Expense",
    amount: 0,
    desc: "",
    category: " ",
    date: Today,
  };
  const [ExpensesIncomes, setExpensesIncomes] = useState(DefaultTransaction);
  const { ExpenseIncomeArray, setExpenseIncomeArray } = useContext(
    ExpenseIncomeArrayContext
  );

  function handleAddingExIn() {
    if (
      ExpensesIncomes.amount <= 0 ||
      ExpensesIncomes.desc.trim() === "" ||
      ExpensesIncomes.category === " " 
    ) {
      alert("Please fill all the fields correctly.");
      return;
    }
    let updatedExpensesIncomes = [...ExpenseIncomeArray, ExpensesIncomes];
    setExpenseIncomeArray(updatedExpensesIncomes);

    setExpensesIncomes(DefaultTransaction);

    setOpen(false);
  }

  // Render
  return (
    <>
      <BootstrapDialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="bg-[#DDF4E7]"
        >
          <h1 className="text-2xl font-bold text-[#67C090]">Add Transaction</h1>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={() => ({
            position: "absolute",
            right: 8,
            top: 8,
          })}
        >
          <IoIosCloseCircleOutline className="text-green-700" />
        </IconButton>
        <DialogContent dividers className="bg-[#DDF4E7] text-[#3c6d51]">
          <form
            action=""
            className="flex flex-col mx-auto"
            style={{ maxWidth: "600px", width: "100%" }}
          >
            <label className="mb-2">Type</label>
            <ButtonGroup
              disableElevation
              aria-label="Disabled button group"
              fullWidth
            >
              <Button
                variant={Tracker === "Expense" ? "contained" : "outlined"}
                onClick={() => {
                  setTracker("Expense");
                  setExpensesIncomes({ ...ExpensesIncomes, type: "Expense" });
                }}
              >
                Expense
              </Button>
              <Button
                variant={Tracker === "Income" ? "contained" : "outlined"}
                onClick={() => {
                  setTracker("Income");
                  setExpensesIncomes({ ...ExpensesIncomes, type: "Income" });
                }}
              >
                Income
              </Button>
            </ButtonGroup>
            <label className="mb-2  mt-3.5">Amount ($)</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="number"
              value={ExpensesIncomes.amount}
              onChange={(e) =>
                setExpensesIncomes({
                  ...ExpensesIncomes,
                  amount: e.target.value,
                })
              }
              inputProps={{
                min: 0,
                step: 0.01,
              }}
            />
            <label className="mb-2 mt-3.5">Description</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              value={ExpensesIncomes.desc}
              onChange={(e) =>
                setExpensesIncomes({
                  ...ExpensesIncomes,
                  desc: e.target.value,
                })
              }
            />
            <label className="mb-2 mt-3.5">Category</label>
            <FormControl fullWidth size="small">
              <Select
                value={ExpensesIncomes.category}
                onChange={(e) =>
                  setExpensesIncomes({
                    ...ExpensesIncomes,
                    category: e.target.value,
                  })
                }
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
              >
                <MenuItem value=" " disabled>
                  Select a Category
                </MenuItem>
                {Tracker === "Expense" ? ExpenseDisplay : IncomeDisplay}
              </Select>
            </FormControl>
            <label className="mb-2 mt-3.5">Date</label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              type="date"
              inputProps={{
                max: Today,
              }}
              value={ExpensesIncomes.date}
              onChange={(e) =>
                setExpensesIncomes({
                  ...ExpensesIncomes,
                  date: e.target.value,
                })
              }
            />
          </form>
        </DialogContent>
        <DialogActions className="bg-[#DDF4E7]">
          <div className="w-full flex flex-wrap justify-around items-center gap-2 my-2">
            <Button
              autoFocus
              variant="outlined"
              onClick={() => setOpen(false)}
              className="w-[45%]"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              autoFocus
              onClick={handleAddingExIn}
              className="w-[45%]"
            >
              Add Transaction
            </Button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
