import { useState } from "react";

export default function SubmissionForm({ onSave }) {
  const [isIncome, setIsIncome] = useState(false); // To toggle between Income and Expense
  const [categories, setCategories] = useState([
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ]); // Default to Expense categories

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

  const [expense, setExpense] = useState({
    id: crypto.randomUUID(),
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Pass data based on whether it's income or expense
    const data = {
      ...expense,
      type: isIncome ? "Income" : "Expense", // Add type to indicate if it's Income or Expense
    };

    onSave(data); // Call onSave with the current expense or income
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
              !isIncome ? "bg-teal-100 text-teal-800" : ""
            }`}
          >
            Expense
          </div>
          <div
            onClick={() => handleToggle("income")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              isIncome ? "bg-teal-100 text-teal-800" : ""
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
          <div className="mt-2">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
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
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={expense.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              value={expense.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
