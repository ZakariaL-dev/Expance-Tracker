// react imports
import { useState } from "react";

// My Contexts
import {
  DialogToggleContext,
  ExpenseIncomeArrayContext,
  SearchTransactionToggleContext,
} from "./Context/MyContext";

// My components
import CalculationTrackers from "./Components/Calculation";
import Header from "./Components/Header";
import SearchBar from "./Components/Search";
import TableTracker from "./Components/TableTrackers";
import AddingDialog from "./Components/AddingDialog";

// Css styling
import "./index.css";

// MUI
import Container from "@mui/material/Container";

function App() {
  const [open, setOpen] = useState(false);
  let [ExpenseIncomeArray, setExpenseIncomeArray] = useState([]);
  const [TrackerSearch, setTrackerSearch] = useState("Expense");
  
  return (
    <>
      <ExpenseIncomeArrayContext.Provider
        value={{ ExpenseIncomeArray, setExpenseIncomeArray }}
      >
        <DialogToggleContext.Provider value={{ open, setOpen }}>
          <Header />
          <Container maxWidth="lg">
            <main className="flex flex-wrap justify-between items-center gap-2 my-6">
              <CalculationTrackers />
            </main>
            <SearchTransactionToggleContext.Provider
              value={{ TrackerSearch, setTrackerSearch }}
            >
              <SearchBar />
              <TableTracker />
            </SearchTransactionToggleContext.Provider>
            <AddingDialog />
          </Container>
        </DialogToggleContext.Provider>
      </ExpenseIncomeArrayContext.Provider>
    </>
  );
}

export default App;
