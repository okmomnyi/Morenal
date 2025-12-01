"use client";
import { useState } from "react";
import Checkbox from "../form/input/Checkbox";

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
}

export default function ProductFilters({
  onFilterChange,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    inStock: false,
    onSale: false,
  });

  const categories = [
    "Electronics",
    "Clothing",
    "Accessories",
    "Home & Garden",
    "Sports",
    "Books",
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCheckboxChange = (
    key: "inStock" | "onSale",
    checked: boolean
  ) => {
    const newFilters = { ...filters, [key]: checked };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="p-6 space-y-6 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-gray-900">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
          Filters
        </h3>
      </div>

      {/* Categories */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">
          Categories
        </h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <Checkbox
              key={category}
              label={category}
              checked={filters.categories.includes(category)}
              onChange={(checked) => handleCategoryChange(category, checked)}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">
          Price Range
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0]}
              onChange={(e) => {
                const newFilters = {
                  ...filters,
                  priceRange: [
                    Number(e.target.value),
                    filters.priceRange[1],
                  ] as [number, number],
                };
                setFilters(newFilters);
                onFilterChange?.(newFilters);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <span className="text-gray-500 dark:text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1]}
              onChange={(e) => {
                const newFilters = {
                  ...filters,
                  priceRange: [
                    filters.priceRange[0],
                    Number(e.target.value),
                  ] as [number, number],
                };
                setFilters(newFilters);
                onFilterChange?.(newFilters);
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-800">
        <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-white/90">
          Availability
        </h4>
        <div className="space-y-3">
          <Checkbox
            label="In Stock Only"
            checked={filters.inStock}
            onChange={(checked) => handleCheckboxChange("inStock", checked)}
          />
          <Checkbox
            label="On Sale"
            checked={filters.onSale}
            onChange={(checked) => handleCheckboxChange("onSale", checked)}
          />
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => {
          const resetFilters: FilterState = {
            categories: [],
            priceRange: [0, 1000],
            inStock: false,
            onSale: false,
          };
          setFilters(resetFilters);
          onFilterChange?.(resetFilters);
        }}
        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        Clear All Filters
      </button>
    </div>
  );
}
