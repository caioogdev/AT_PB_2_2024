import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useExpenseContext } from "../contexts/ExpenseContext";

export default function Control() {
  const { expenses, setExpenses, expenseTypes, setExpenseTypes } = useExpenseContext();
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [newType, setNewType] = useState("");
  const [editingId, setEditingId] = useState(null);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setDate(getCurrentDate());
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const resetFields = () => {
    setDescription("");
    setAmount("");
    setDate(getCurrentDate());
    setType("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editingId
            ? { ...expense, description, amount: parseFloat(amount), date: formatDate(date), type }
            : expense
        )
      );
      setEditingId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        date: formatDate(date),
        type,
      };
      setExpenses((prev) => [...prev, newExpense]);
    }

    resetFields();
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setDate(expense.date.split("/").reverse().join("-"));
    setType(expense.type);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const addExpenseType = () => {
    if (newType.trim() && !expenseTypes.includes(newType)) {
      setExpenseTypes((prev) => [...prev, newType]);
      setNewType("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6 rounded-lg">
        <CardHeader>
          <CardTitle>Gerenciador de Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl w-full"
                required
              />
              <Input
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-xl w-full"
                required
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl w-full"
                required
              />
              <div className="flex flex-col md:flex-row items-stretch gap-2">
                <Select
                  onValueChange={(value) => setType(value)}
                  value={type || undefined}
                  required
                  className="flex-1"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o Tipo de Despesa" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {expenseTypes.map((expenseType) => (
                      <SelectItem key={expenseType} value={expenseType}>
                        {expenseType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="border rounded-xl border-black hover:bg-black hover:text-white whitespace-nowrap px-4 py-2"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Novo Tipo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-black">
                        Adicionar Novo Tipo de Despesa
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Novo Tipo de Despesa"
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        className="rounded-xl w-full"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          className="bg-red-600 text-white hover:text-red-600 hover:bg-white hover:border-2 hover:border-red-600 rounded-xl"
                          onClick={() => setNewType("")}
                        >
                          Limpar
                        </Button>
                        <Button
                          className="border rounded-xl border-black hover:bg-black hover:text-white"
                          onClick={addExpenseType}
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-full md:w-[40%] border rounded-xl border-black hover:bg-black hover:text-white"
              >
                {editingId !== null ? "Atualizar Despesa" : "Adicionar Despesa"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
  
      <Card>
        <CardHeader>
          <CardTitle>Lista de Despesas</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[20rem] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>R$ {expense.amount.toFixed(2)}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(expense)}
                      className="p-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(expense.id)}
                      className="p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}