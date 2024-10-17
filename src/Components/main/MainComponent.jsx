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

    if (taskToUpdate) {
      // Update existing task
      const updatedTasks = tasks.map((t) =>
        t.id === taskToUpdate.id ? { ...task, id: taskToUpdate.id } : t
      );
      setTasks(updatedTasks);
      setTaskToUpdate(null); // Clear edit state
    } else {
      // Create a new task with a unique ID
      const newTask = { ...task, id: Date.now() };
      setTasks((prevTasks) => [...prevTasks, newTask]);

      if (task.type === "Income") {
        setTotalIncome((prevIncome) => prevIncome + taskAmount);
        setBalance((prevBalance) => prevBalance + taskAmount);
      } else {
        setTotalExpense((prevExpense) => prevExpense + taskAmount);
        setBalance((prevBalance) => prevBalance - taskAmount);
      }
    }
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task); // Set task to be edited
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    if (taskToDelete) {
      const taskAmount = parseFloat(taskToDelete.amount || 0);
      if (taskToDelete.type === "Income") {
        setTotalIncome((prevIncome) => prevIncome - taskAmount);
        setBalance((prevBalance) => prevBalance - taskAmount);
      } else {
        setTotalExpense((prevExpense) => prevExpense - taskAmount);
        setBalance((prevBalance) => prevBalance + taskAmount);
      }
    }

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
              deleteIncome={deleteTask}
              onEdit={handleEditTask}
            />
            <Expense
              tasks={tasks.filter((task) => task.type === "Expense")}
              deleteExpense={deleteTask}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
