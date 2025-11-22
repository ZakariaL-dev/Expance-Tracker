import { createContext } from "react";

export const DialogToggleContext = createContext({});

// the globale array to store income and expense items
export const ExpenseIncomeArrayContext = createContext([]);

// Search Transaction Type Context
export const SearchTransactionToggleContext = createContext("Expense");