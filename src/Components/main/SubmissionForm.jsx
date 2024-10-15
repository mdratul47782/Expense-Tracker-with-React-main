import { useState, useEffect } from "react";

export default function SubmissionForm({ onSave, taskToUpdate }) {
  const [isIncome, setIsIncome] = useState(false);
  const [categories, setCategories] = useState([
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ]);

  const handleToggle = (type) => {
    if (type === "income") {
      setCategories(["Salary", "Outsourcing", "Bond", "Dividend"]);
      setIsIncome(true);
    } else {
      setCategories([
        "Education",
        "Food",
        "Health",
        "Bill",
        "Insurance",
        "Tax",
        "Transport",
        "Telephone",
      ]);
      setIsIncome(false);
    }
  };

  // Initialize form with empty values or taskToUpdate data
  const [expense, setExpense] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      category: "",
      amount: "",
      date: "",
    }
  );

  // Populate form if taskToUpdate changes (edit mode)
  useEffect(() => {
    if (taskToUpdate) {
      setExpense(taskToUpdate);
      setIsIncome(taskToUpdate.type === "Income");
    }
  }, [taskToUpdate]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...expense,
      type: isIncome ? "Income" : "Expense",
    };

    onSave(data); // Pass data to parent
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            onClick={() => handleToggle("expense")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              !isIncome ? "bg-teal-600 text-white shadow-sm" : ""
            }`}
          >
            Expense
          </div>
          <div
            onClick={() => handleToggle("income")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              isIncome ? "bg-teal-600 text-white shadow-sm" : ""
            }`}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={expense.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
             placeholder="12931"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={expense.date}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {taskToUpdate ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}
