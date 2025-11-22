import React from 'react';

const FilterBar = ({ categories, selectedCategory, onCategoryChange, onClearAll }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10" role="navigation" aria-label="Filter categories">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Filter by Category</h2>
          <button
            onClick={onClearAll}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 self-start sm:self-auto"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 sm:space-x-3 pb-2 min-w-max" role="tablist" aria-label="Food categories">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls="nutrition-table"
                aria-label={`Filter by ${category} category`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterBar;
