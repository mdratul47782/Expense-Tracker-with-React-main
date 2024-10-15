import { useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import SubmissionForm from "./SubmissionForm";
import TotalBalance from "./TotalBalance";

export default function MainComponent() {
  const [balance, setBalance] = useState(20000); // Initial balance
  const [totalIncome, setTotalIncome] = useState(20000); // Initial income
  const [totalExpense, setTotalExpense] = useState(0); // Initial expense
  const [tasks, setTasks] = useState([]); // Store all tasks (income and expense)
  const [taskToUpdate, setTaskToUpdate] = useState(null); // Task to be edited

  const handleAddTask = (task) => {
    const taskAmount = parseFloat(task.amount || 0);

    if (task.type === "Income") {
      // For income, add to total income and balance
      setTotalIncome((prevIncome) => prevIncome + taskAmount);
      setBalance((prevBalance) => prevBalance + taskAmount);
    } else {
      // For expense, add to total expense and subtract from balance
      setTotalExpense((prevExpense) => prevExpense + taskAmount);
      setBalance((prevBalance) => prevBalance - taskAmount);
    }

    if (taskToUpdate) {
      // Update the task if we're editing
      const updatedTasks = tasks.map((t) =>
        t.id === task.id ? task : t
      );
      setTasks(updatedTasks);
      setTaskToUpdate(null); // Clear edit state
    } else {
      // Add new task
      setTasks((prevTasks) => [...prevTasks, task]);
    }
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task); // Pass task to be edited
  };

  const deleteExpense = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const deleteIncome = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Submission Form */}
        <SubmissionForm onSave={handleAddTask} taskToUpdate={taskToUpdate} />

        {/* Right Column */}
        <div className="lg:col-span-2">
          <TotalBalance
            totalBalance={balance}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income
              tasks={tasks.filter((task) => task.type === "Income")}
              deleteIncome={deleteIncome}
              onEdit={handleEditTask}
            />
            <Expense
              tasks={tasks.filter((task) => task.type === "Expense")}
              deleteExpense={deleteExpense}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
