import React, { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState(["Alimentação", "Transporte", "Outros"]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    const savedTypes = localStorage.getItem("expenseTypes");
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedTypes) setExpenseTypes(JSON.parse(savedTypes));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("expenseTypes", JSON.stringify(expenseTypes));
  }, [expenseTypes]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, expenseTypes, setExpenseTypes }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  return useContext(ExpenseContext);
}