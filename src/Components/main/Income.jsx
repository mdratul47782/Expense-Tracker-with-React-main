import { useState } from "react";

// Income Component
export default function Income({ tasks, deleteIncome,onEdit }) {
  const [isSortingOpen, setSortingOpen] = useState(false);
  const [isFilteringOpen, setFilteringOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Sorting function
  const handleSort = (order) => {
    setSortOrder(order);
    setSortingOpen(false);
  };

  // Filtering function
  const handleFilterChange = (category) => {
    if (selectedFilters.includes(category)) {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== category)
      );
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (selectedFilters.length === 0) return true;
      return selectedFilters.includes(task.category);
    })
    .sort((a, b) => {
      if (sortOrder === "low-to-high") {
        return a.amount - b.amount;
      } else if (sortOrder === "high-to-low") {
        return b.amount - a.amount;
      }
      return 0;
    });

  return (
    <div className="border rounded-md">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
              <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Income
            </h3>
          </div>
        </div>

        {/* Sorting and Filtering */}
        <div className="flex gap-4">
            {/* Sorting */}
            <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setSortingOpen(!isSortingOpen)}
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-sort-descending"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 6l9 0" />
                  <path d="M4 12l7 0" />
                  <path d="M4 18l7 0" />
                  <path d="M15 15l3 3l3 -3" />
                  <path d="M18 6l0 12" />
                </svg>
            </button>

            {isSortingOpen && (
              <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => handleSort("low-to-high")}
                  >
                    Low to High
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => handleSort("high-to-low")}
                  >
                    High to Low
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              onClick={() => setFilteringOpen(!isFilteringOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon-tabler icon-tabler-adjustments-alt"
              >
                <path d="M4 8h4v4h-4z" />
                <path d="M6 4l0 4" />
                <path d="M6 12l0 8" />
                <path d="M10 14h4v4h-4z" />
                <path d="M12 4l0 10" />
                <path d="M12 18l0 2" />
                <path d="M16 5h4v4h-4z" />
                <path d="M18 4l0 1" />
                <path d="M18 9l0 11" />
              </svg>
            </button>

            {isFilteringOpen && (
              <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {["Salary", "Outsourcing", "Bond","Dividend"].map((category) => (
                    <label
                      key={category}
                      className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                        checked={selectedFilters.includes(category)}
                        onChange={() => handleFilterChange(category)}
                      />
                      <span className="ml-2">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Income List */}
      <div className="p-4 divide-y">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center py-2 relative group cursor-pointer"
          >
            <div>
              <h3 className="text-base font-medium leading-7 text-gray-600">
                {task.category}
              </h3>
              <p className="text-xs text-gray-600">{task.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                BDT {task.amount}
              </p>
              <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all ">
                {/* Edit Button */}
                <button className="hover:text-teal-600" title="Edit"
                 onClick={()=>onEdit(task)}>
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                </button>
                {/* Delete Button */}
                <button
                  className="hover:text-red-600"
                  title="Delete"
                  onClick={() => deleteIncome(task.id)}
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M4 7l16 0" />
                      <path d="M10 11l0 6" />
                      <path d="M14 11l0 6" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7l1 -3h4l1 3" />
                    </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
