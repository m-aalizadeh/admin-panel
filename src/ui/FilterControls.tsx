import { useState } from "react";

interface FilterOptions {
  id: string;
  label: string;
}

interface FilterControlProps {
  categories: FilterOptions[];
  onFilterChange: (selectedCategory: string) => void;
}

export default function FilterControl({
  categories,
  onFilterChange,
}: FilterControlProps) {
  const [selected, setSelected] = useState<string>();

  const handleCheckboxChange = (categoryId: string) => {
    setSelected(selected);
    onFilterChange(categoryId);
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-xlg">
      <div className="flex items-center gap-4">
        <h3 className="font-semibold whitespace-nowrap">Filter by Status</h3>
        <select
          id="status"
          value={selected}
          onChange={(e) => {
            handleCheckboxChange(e.target.value);
          }}
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1 min-w-0"
        >
          <option value=""></option>
          {categories.map((category) => (
            <option value={category.id}>{category.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
