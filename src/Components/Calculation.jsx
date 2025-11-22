// React Icons
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

import { useContext, useState, useEffect } from "react";
import { ExpenseIncomeArrayContext } from "../Context/MyContext";

const CalculationTrackers = () => {
  const { ExpenseIncomeArray } = useContext(ExpenseIncomeArrayContext);
  // Filter for the Expences
  const ExpenseArray = ExpenseIncomeArray.filter((a) => a.type === "Expense");
  // calc total EXA
  const totalExpenses = ExpenseArray.reduce(
    (sum, ea) => sum + Number(ea.amount),
    0
  );
  const [totalExA, settotalExA] = useState(0);
  useEffect(() => {
    settotalExA(totalExpenses);
  }, [totalExpenses]);

  // Filter for the Incomes
  const IncomeArray = ExpenseIncomeArray.filter((a) => a.type === "Income");
  // calc total EXA
  const totalIncomes = IncomeArray.reduce(
    (sum, ea) => sum + Number(ea.amount),
    0
  );
  const [totalInA, settotalInA] = useState(0);
  useEffect(() => {
    settotalInA(totalIncomes);
  }, [totalIncomes]);

  const Balance = totalInA - totalExA;

  const Trackers = [
    {
      id: 1,
      Title: "Total Income",
      Amount: `$ ${totalInA}`,
      colorText: "text-emerald-500",
      colorBg: "bg-emerald-200",
      Icon: <FaArrowTrendUp />,
    },
    {
      id: 2,
      Title: "Total Expanses",
      Amount: `$ ${totalExA}`,
      colorText: "text-red-700",
      colorBg: "bg-red-200",
      Icon: <FaArrowTrendDown />,
    },
    {
      id: 3,
      Title: "Balance",
      Amount: `$ ${Balance}`,
      colorText: Balance >= 0 ? "text-emerald-500" : "text-red-700",
      colorBg: Balance >= 0 ? "bg-emerald-200" : "bg-red-200",
      Icon: Balance >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />,
    },
  ];

  let CalcCard = Trackers.map((t) => {
    return (
      <div
        id={t.id}
        className="rounded-xl bg-[#e0fff5] flex justify-between items-center lg:w-[32%] w-full py-3 px-6 shadow-lg"
      >
        <div className="text-left">
          <h2>{t.Title}</h2>
          <h1 className={t.colorText + " text-xl font-bold"}>{t.Amount}</h1>
        </div>
        <div
          className={
            t.colorText +
            " " +
            t.colorBg +
            " text-center p-3 rounded-full text-xl"
          }
        >
          {t.Icon}
        </div>
      </div>
    );
  });
  return <>{CalcCard}</>;
};

export default CalculationTrackers;
