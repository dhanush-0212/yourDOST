import React, { useState } from 'react';

const SearchBar = ({ onSearch, onFilter, filterType, filterValue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localFilterType, setLocalFilterType] = useState(filterType);
  const [localFilterValue, setLocalFilterValue] = useState(filterValue);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterTypeChange = (e) => {
    const type = e.target.value;
    setLocalFilterType(type);
    setLocalFilterValue('');
    onFilter(type, '');
  };

  const handleFilterValueChange = (e) => {
    const value = e.target.value;
    setLocalFilterValue(value);
    onFilter(localFilterType, value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocalFilterType('all');
    setLocalFilterValue('');
    onSearch('');
    onFilter('all', '');
  };

  return (
    <div className="controls">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="filter-container">
        <select
          className="filter-select"
          value={localFilterType}
          onChange={handleFilterTypeChange}
        >
          <option value="all">All Users</option>
          <option value="domain">Filter by Email Domain</option>
          <option value="firstLetter">Filter by First Letter</option>
          <option value="lastName">Filter by Last Name</option>
        </select>

        {localFilterType !== 'all' && (
          <input
            type="text"
            className="filter-select"
            placeholder={
              localFilterType === 'domain' ? 'Enter domain (e.g., reqres.in)' :
              localFilterType === 'firstLetter' ? 'Enter first letter' :
              localFilterType === 'lastName' ? 'Enter last name' :
              'Enter filter value'
            }
            value={localFilterValue}
            onChange={handleFilterValueChange}
          />
        )}

        <button
          className="filter-select"
          onClick={clearFilters}
          style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none' }}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
