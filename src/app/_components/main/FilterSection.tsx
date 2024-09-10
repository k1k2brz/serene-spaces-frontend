import React from 'react';

interface FilterSectionProps {
  filters: string[];
  onFilterClick: (filter: string) => void;
  onAllFiltersClick: () => void;
}

export const FilterSection = ({ filters, onFilterClick, onAllFiltersClick }: FilterSectionProps) => {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between space-y-4 sm:space-y-0">
      <div className="flex flex-wrap space-x-4">
        {filters.map((filter) => (
          <button
            key={filter}
            className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50"
            onClick={() => onFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <button className="rounded-md bg-white px-4 py-2 shadow hover:bg-serene-50" onClick={onAllFiltersClick}>
        All Filters
      </button>
    </div>
  );
};
