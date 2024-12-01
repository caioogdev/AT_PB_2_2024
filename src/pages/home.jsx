import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useExpenseContext } from "../contexts/ExpenseContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const { expenses, expenseTypes } = useExpenseContext();

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpenseTypesUsed = expenseTypes.filter((type) =>
    expenses.some((expense) => expense.type === type)
  ).length;

  const expenseByType = expenseTypes.map((type) => ({
    type,
    total: expenses
      .filter((expense) => expense.type === type)
      .reduce((sum, expense) => sum + expense.amount, 0),
  }));

  const barChartData = {
    labels: expenseByType.map((item) => item.type),
    datasets: [
      {
        label: "Despesas por Tipo",
        data: expenseByType.map((item) => item.total),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: "#000",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Despesas por Tipo" },
    },
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Total de Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ {totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg shadow-md">
          <CardHeader>
            <CardTitle>Total de Tipos de Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalExpenseTypesUsed}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
}