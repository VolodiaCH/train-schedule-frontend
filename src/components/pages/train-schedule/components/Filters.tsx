import React from 'react';

interface FilterProps {
  searchDeparture: string;
  searchArrival: string;
  startDate: string;
  endDate: string;
  sortOrder: 'asc' | 'desc';
  setSearchDeparture(newValue: string): void;
  setSearchArrival(newValue: string): void;
  setStartDate(newValue: string): void;
  setEndDate(newValue: string): void;
  setSortOrder(newValue: 'asc' | 'desc'): void;
}

const Filters: React.FC<FilterProps> = (props) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Departure"
        value={props.searchDeparture}
        onChange={(e) => props.setSearchDeparture(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Arrival"
        value={props.searchArrival}
        onChange={(e) => props.setSearchArrival(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <input
        type="date"
        value={props.startDate}
        onChange={(e) => props.setStartDate(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <input
        type="date"
        value={props.endDate}
        onChange={(e) => props.setEndDate(e.target.value)}
        className="p-2 border rounded w-full"
      />
      <select
        value={props.sortOrder}
        onChange={(e) => props.setSortOrder(e.target.value as 'asc' | 'desc')}
        className="p-2 border rounded w-full col-span-2"
      >
        <option value="asc">Sort by Departure (Earliest First)</option>
        <option value="desc">Sort by Departure (Latest First)</option>
      </select>
    </div>
  );
};

export default Filters;
